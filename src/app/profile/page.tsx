"use client";
import ProductCard from "@/components/ProductCard";
import useLogin from "@/hooks/useLogin";
import Image from "next/image";
import React from "react";

const ProfilePage: React.FC = () => {
	const [products, setProducts] = React.useState([]);
	const [chats, setChats] = React.useState([]);

	const { checkLogin } = useLogin();

	const getProducts = async () => {
		const res = await fetch(
			"/api/products/user/" + localStorage.getItem("user"),
			{
				cache: "no-cache",
			}
		);
		const data = await res.json();
		console.log(data);
		setProducts(data.products);
	};

	const getChats = async () => {
		const res = await fetch("/api/chats/user/" + localStorage.getItem("user"), {
			cache: "no-cache",
		});
		const data = await res.json();
		console.log(data);
		setChats(data.chats);
	};

	React.useEffect(() => {
		checkLogin();
		getProducts();
	}, []);

	return (
		<main className="flex min-h-screen flex-col items-center p-12">
			<div className="flex flex-col ">
				<main className="flex-1">
					<section className="w-full py-5 sm:py-10 md:py-10 xl:py-10">
						<div className="container px-4 md:px-6">
							<div className="flex flex-col items-center space-y-4 text-center">
								<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
									Welcome to BID BITS
								</h1>
								<p className="mx-auto max-w-[700px] text-zinc-500 md:text-xl dark:text-zinc-400">
									You can view your product listings and chat with the highest
									bidders here.
								</p>
							</div>
						</div>
					</section>
				</main>
			</div>
			{/* 
                A tabbed section for the user to view their products and chats
            */}
			<div className="flex flex-col items-center justify-center w-full">
				<div className="container px-4 md:px-6">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
						<div className="card border rounded-lg overflow-hidden">
							<div className="p-6 space-y-2">
								<h3 className="text-lg font-semibold">Products</h3>
								<p className="text-sm text-zinc-500 dark:text-zinc-400">
									View and manage your products here.
								</p>
								<div className="flex items-center gap-10 max-h-fit overflow-x-scroll max-w-full">
									{products.length > 0 ? (
										products.map((product: any) => (
											<ProductCard product={product} key={product.productId} />
										))
									) : (
										<div className="card border rounded-lg overflow-hidden">
											<div className="p-6 space-y-2">
												<h3 className="text-lg font-semibold">No Products</h3>
												<p className="text-sm text-zinc-500 dark:text-zinc-400">
													You have not listed any products yet.
												</p>
											</div>
										</div>
									)}
								</div>
								<div className="p-6 space-y-2">
									<h3 className="text-lg font-semibold">Chats</h3>
									<p className="text-sm text-zinc-500 dark:text-zinc-400">
										Chat with bidders here.
									</p>
									<div className="flex items-center gap-10 max-h-fit overflow-x-scroll max-w-full">
										{chats.length > 0 ? (
											chats.map((chat: any) => (
												<div className="card border rounded-lg overflow-hidden">
													<Image
														src={
															"https://ucarecdn.com/" + chat.product.image + "/"
														}
														width={400}
														height={300}
														className="object-cover"
														alt="Product"
													/>
													<div className="p-6 space-y-2">
														<h3 className="text-lg font-semibold">
															{chat.product.productName}
														</h3>
													</div>
												</div>
											))
										) : (
											<div className="p-6 space-y-2">
												<h3 className="text-lg font-semibold">No Chats</h3>
												<p className="text-sm text-zinc-500 dark:text-zinc-400">
													You have no chats yet.
												</p>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default ProfilePage;
