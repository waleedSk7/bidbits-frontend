import Navbar from "@/components/Navbar";
import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div className="flex flex-col min-h-[100vh]">
				<Navbar />
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
									href="#"
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
								<div className="rounded-md shadow-md overflow-hidden">
									<img
										alt="Product"
										className="object-cover"
										height="300"
										src="https://i.pcmag.com/imagery/reviews/04jlYF4fsF2M5cejiU8lw7G-2.fit_lim.size_840x473.v1685028816.jpg"
										style={{
											aspectRatio: "400/300",
											objectFit: "cover",
										}}
										width="400"
									/>
									<div className="p-4">
										<h3 className="text-lg font-bold">Product Name</h3>
										<p className="text-sm text-gray-500 mt-2">
											Short product description goes here.
										</p>
										<Button className="mt-4">View Details</Button>
									</div>
								</div>
								<div className="rounded-md shadow-md overflow-hidden">
									<img
										alt="Product"
										className="object-cover"
										height="300"
										src="https://i.pcmag.com/imagery/reviews/04jlYF4fsF2M5cejiU8lw7G-2.fit_lim.size_840x473.v1685028816.jpg"
										style={{
											aspectRatio: "400/300",
											objectFit: "cover",
										}}
										width="400"
									/>
									<div className="p-4">
										<h3 className="text-lg font-bold">Product Name</h3>
										<p className="text-sm text-gray-500 mt-2">
											Short product description goes here.
										</p>
										<Button className="mt-4">View Details</Button>
									</div>
								</div>
								<div className="rounded-md shadow-md overflow-hidden">
									<img
										alt="Product"
										className="object-cover"
										height="300"
										src="https://i.pcmag.com/imagery/reviews/04jlYF4fsF2M5cejiU8lw7G-2.fit_lim.size_840x473.v1685028816.jpg"
										style={{
											aspectRatio: "400/300",
											objectFit: "cover",
										}}
										width="400"
									/>
									<div className="p-4">
										<h3 className="text-lg font-bold">Product Name</h3>
										<p className="text-sm text-gray-500 mt-2">
											Short product description goes here.
										</p>
										<Button className="mt-4">View Details</Button>
									</div>
								</div>
							</div>
						</div>
					</section>
				</main>
				<footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
					<p className="text-xs text-zinc-500 dark:text-zinc-400">
						© College Auctions. All rights reserved.
					</p>
					<nav className="sm:ml-auto flex gap-4 sm:gap-6">
						<Link
							className="text-xs hover:underline underline-offset-4"
							href="#"
						>
							About Us
						</Link>
						<Link
							className="text-xs hover:underline underline-offset-4"
							href="#"
						>
							Contact
						</Link>
						<Link
							className="text-xs hover:underline underline-offset-4"
							href="#"
						>
							Privacy Policy
						</Link>
						<Link
							className="text-xs hover:underline underline-offset-4"
							href="#"
						>
							Terms of Service
						</Link>
					</nav>
				</footer>
			</div>
		</main>
	);
}
