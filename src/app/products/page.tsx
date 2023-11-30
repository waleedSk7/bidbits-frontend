"use client";
import Product from "@/Types/product";
import ProductCard from "@/components/ProductCard";
import useLogin from "@/hooks/useLogin";
import { Search } from "@mui/icons-material";
import { Button, Input } from "@mui/material";
import * as React from "react";
import * as Categories from "./categories";

export interface IProductsProps {}

export default function Products(props: IProductsProps) {
	const { checkLogin } = useLogin();
	const [products, setProducts] = React.useState<Product[]>([]);
	const [search, setSearch] = React.useState("");
	const [category, setCategory] = React.useState("");
	const displayProducts = React.useMemo(() => {
		return products.filter((product) => {
			if (category !== "") {
				if (product.category !== category) return false;
			}
			let nameSearch = product.productName
				.toLowerCase()
				.includes(search.toLowerCase());
			let descSearch = product.details
				.toLowerCase()
				.includes(search.toLowerCase());
			const categorySearch = product.category
				.toLowerCase()
				.includes(search.toLowerCase());
			return nameSearch || descSearch || categorySearch;
		});
	}, [products, search, category]);

	const getProducts = async () => {
		const res = await fetch("/api/products");
		const data = await res.json();
		setProducts(data.products);
	};
	React.useEffect(() => {
		checkLogin();
		getProducts();
	}, []);
	return (
		<div>
			<section className="w-full  pt-12 md:pt-24 lg:pt-32 flex justify-center">
				<div className="container px-4 md:px-6">
					<div className="flex flex-col items-center space-y-4 text-center">
						<div className="space-y-2">
							<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
								Our Products
							</h1>
							<p className="mx-auto max-w-[700px] text-zinc-500 md:text-xl dark:text-zinc-400">
								Explore the wide variety of products available for auction
								within your college community.
							</p>
						</div>
					</div>
				</div>
			</section>
			<section className="w-full py-12 md:py-24 lg:py-32 flex justify-center items-center">
				<Input
					placeholder="Search for products"
					className=" w-1/2"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					endAdornment={<Search />}
				/>
			</section>
			{/* Section for catgory filter */}
			<section className="w-full py-5 md:py-5 lg:py-5 flex justify-center items-center flex-wrap">
				{Categories.default.map((setcategory) => (
					<Button
						className={`${
							category !== setcategory.name ? "bg-zinc-500" : "bg-black"
						} text-white rounded-md p-2 m-2 min-w-min`}
						onClick={() => {
							if (category !== setcategory.name) setCategory(setcategory.name);
							else setCategory("");
						}}
					>
						{setcategory.name}
					</Button>
				))}
			</section>
			<section className="w-full">
				<div className="flex w-screen">
					<div className="flex flex-wrap overflow-hidden w-full gap-10 justify-center">
						{displayProducts.map((product: any) => (
							<ProductCard details product={product} key={product.productId} />
						))}
					</div>
				</div>
			</section>
		</div>
	);
}
