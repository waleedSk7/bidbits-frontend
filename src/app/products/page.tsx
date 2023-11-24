"use client";
import useLogin from "@/hooks/useLogin";
import * as React from "react";

export interface IProductsProps {}

export default function Products(props: IProductsProps) {
	const { checkLogin } = useLogin();
	React.useEffect(() => {
		checkLogin();
	}, []);
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h1 className="text-3xl font-bold mb-8">Products Page</h1>
		</div>
	);
}
