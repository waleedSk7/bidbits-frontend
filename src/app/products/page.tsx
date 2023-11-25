"use client";
import useLogin from "@/hooks/useLogin";
import * as React from "react";

export interface IProductsProps {}

export default function Products(props: IProductsProps) {
	const { checkLogin } = useLogin();
	const [products, setProducts] = React.useState([]);

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
		<div className="flex flex-col items-center justify-center h-screen">
			<main className="flex-1">
				<section className="w-full py-12 md:py-24 lg:py-32">
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
				<section className="w-full py-12 md:py-24 lg:py-32">
					<div className="container px-4 md:px-6">
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
							{products.map((product: any) => (
								<div
									className="card border rounded-lg overflow-hidden"
									key={product.productId}
								>
									<img
										alt="Product Image"
										className="w-full object-cover h-48"
										height="300"
										src={"https://ucarecdn.com/" + product.image + "/"}
										style={{
											aspectRatio: "300/300",
											objectFit: "cover",
										}}
										width="300"
									/>
									<div className="p-6 space-y-2">
										<h3 className="text-lg font-semibold">
											{product.productName}
										</h3>
										<p className="text-sm text-zinc-500 dark:text-zinc-400">
											{product.details}
										</p>
										<div className="flex justify-between items-center">
											<span className="text-lg font-bold">
												Starting Bid: Rs. {product.startingBid}
											</span>
										</div>
									</div>
								</div>
							))}
							{/* <div className="card border rounded-lg overflow-hidden">
								<img
									alt="Product Image"
									className="w-full object-cover h-48"
									height="300"
									src="/placeholder.svg"
									style={{
										aspectRatio: "300/300",
										objectFit: "cover",
									}}
									width="300"
								/>
								<div className="p-6 space-y-2">
									<h3 className="text-lg font-semibold">Product Title</h3>
									<p className="text-sm text-zinc-500 dark:text-zinc-400">
										Brief description of the product.
									</p>
									<div className="flex justify-between items-center">
										<span className="text-lg font-bold">Current Bid: $50</span>
										<span className="text-sm text-zinc-500">
											Time Remaining: 5 days
										</span>
									</div>
								</div>
							</div> */}
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
