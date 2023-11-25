import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

async function getProducts() {
	const res = await fetch(process.env.backendUrl + "/api/v1/products/featured");
	const data = await res.json();
	return data;
}

export default async function Home() {
	const products = await getProducts();
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div className="flex flex-col min-h-[100vh]">
				<main className="flex-1">
					<section className="w-full py-12 sm:py-24 md:py-32 xl:py-48">
						<div className="container px-4 md:px-6">
							<div className="flex flex-col items-center space-y-4 text-center">
								<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
									Welcome to BID BITS
								</h1>
								<p className="mx-auto max-w-[700px] text-zinc-500 md:text-xl dark:text-zinc-400">
									The best place for BPHC students to auction their products and
									find great deals.
								</p>
								<Link
									className="inline-flex h-10 items-center justify-center rounded-md bg-zinc-900 px-8 text-sm font-medium text-zinc-50 shadow transition-colors hover:bg-zinc-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 dark:focus-visible:ring-zinc-300"
									href="/products/add"
								>
									Start Auctioning
								</Link>
							</div>
						</div>
					</section>
					<section className="w-full py-12 md:py-24 lg:py-32">
						<div className="container px-4 md:px-6">
							<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-center">
								Featured Products
							</h2>
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
								{products.map(
									(product: {
										productId: number;
										image: string;
										productName: string;
										details: string;
									}) => (
										<div
											className="rounded-md shadow-md overflow-hidden"
											key={product.productId}
										>
											<Image
												priority
												alt="Product"
												className="object-cover"
												height="300"
												src={"https://ucarecdn.com/" + product.image + "/"}
												style={{
													aspectRatio: "400/300",
													objectFit: "cover",
												}}
												width="400"
											/>
											<div className="p-4">
												<h3 className="text-lg font-bold">
													{product.productName}
												</h3>
												<p className="text-sm text-gray-500 mt-2">
													{product.details}
												</p>
												<Link href={`/products/${product.productId}`}>
													<Button className="mt-4">View Details</Button>
												</Link>
											</div>
										</div>
									)
								)}
							</div>
						</div>
					</section>
				</main>
			</div>
		</main>
	);
}
