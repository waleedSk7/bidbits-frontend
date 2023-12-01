import useLogin from "@/hooks/useLogin";
import axios from "axios";
import Link from "next/link";
import * as React from "react";
import LoginButton from "./LoginButton";
export interface IAppProps {}

export default async function Navbar(props: IAppProps) {
	return (
		<header className="px-4 lg:px-6 h-14 w-full flex items-center absolute top-0 left-0 bg-[#172f39] overflow-hidden shadow">
			<Link className="flex items-center justify-center" href="/">
				<img
					src={
						"https://ucarecdn.com/37c6bf1f-d8c4-43e1-aead-944010929991/-/preview/500x500/-/quality/smart/-/format/auto/"
					}
					className="h-16 w-20  mr-2 rounded-full object-contain"
				/>
				<h1 className="text-2xl font-bold text-white">BID BITS</h1>
			</Link>
			<nav className="text-white ml-auto flex gap-4 sm:gap-6 z-20">
				<Link
					className="text-sm font-medium hover:underline underline-offset-4"
					href="/"
				>
					Home
				</Link>
				<Link
					className="text-sm font-medium hover:underline underline-offset-4"
					href="/products"
				>
					Products
				</Link>
				<Link
					className="text-sm font-medium hover:underline underline-offset-4"
					href="/chat"
				>
					Messages
				</Link>
				<LoginButton />
			</nav>
		</header>
	);
}

function IconMountain(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="m8 3 4 8 5-5 5 15H2L8 3z" />
		</svg>
	);
}
