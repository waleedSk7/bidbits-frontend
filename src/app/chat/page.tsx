"use client";
import Message from "@/Types/message";
import Product from "@/Types/product";
import useLogin from "@/hooks/useLogin";
import { Button, Card, CardContent, Input } from "@mui/material";
import React, { useMemo } from "react";

export default function Chat() {
	const { checkLogin } = useLogin();
	const [products, setProducts] = React.useState<Product[]>([]);
	const [selectedId, setSelectedId] = React.useState<number | null>(null);
	const selectedProduct = useMemo(() => {
		return products.find((product) => Number(product.productId) === selectedId);
	}, [selectedId, products]);
	const [messages, setMessages] = React.useState<Message[]>([]);
	const [message, setMessage] = React.useState("");
	const fetchMessages = async () => {
		const res = await fetch("/api/chats/user/" + localStorage.getItem("user"), {
			cache: "no-cache",
		});
		const data = await res.json();
		console.log(data);
		setProducts(data.products);
		return products;
	};
	React.useEffect(() => {
		checkLogin();
		fetchMessages();
	}, []);
	React.useEffect(() => {
		if (selectedProduct) {
			if (selectedProduct.messages) setMessages(selectedProduct.messages);
			console.log(selectedProduct.messages);
		}
	}, [selectedProduct, products]);

	const handleSend = async () => {
		if (!selectedProduct) {
			return;
		}
		if (!message) {
			return;
		}
		const res = await fetch("/api/chats/user/" + localStorage.getItem("user"), {
			method: "POST",
			body: JSON.stringify({
				productId: selectedProduct.productId,
				message: message,
				receiverId: selectedProduct.user.userId,
			}),
			cache: "no-cache",
		});
		setMessage("");
		await fetchMessages();
	};

	return (
		<div key="1" className="flex h-screen bg-white dark:bg-zinc-800">
			<aside className="w-80 border-r dark:border-zinc-700">
				<div className="p-4 pt-10 space-y-4">
					<div className="flex justify-between items-center pt-10">
						<h2 className="text-xl font-bold">Messages</h2>
					</div>
					<div className="relative">
						<Input
							className="pl-8"
							placeholder="Search messages..."
							type="search"
						/>
						<Button className="absolute right-2.5 top-3" />
					</div>
					<div className="space-y-2">
						{products.map((product: Product) => (
							<Card className="p-2" key={product.productId}>
								<CardContent
									onClick={() => {
										setSelectedId(Number(product.productId));
									}}
								>
									<h3 className="font-semibold">{product.productName}</h3>
									<p className="text-xs text-zinc-500 dark:text-zinc-400">
										{product.details}
									</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</aside>
			<section className="flex flex-col w-full">
				<header className="border-b dark:border-zinc-700 p-4">
					<h2 className="text-xl font-bold">
						{selectedProduct
							? selectedProduct.sold
								? selectedProduct.user.name
								: selectedProduct.productName
							: ""}
					</h2>
				</header>
				<main className="flex-1 overflow-auto p-4">
					<div className="space-y-4">
						{messages.map((message: Message) => (
							<div
								key={message.messageId}
								className={`flex items-end gap-2 ${
									message.sender.userId == Number(localStorage.getItem("user"))
										? "justify-end"
										: ""
								}`}
							>
								<div className="rounded-lg bg-zinc-200 dark:bg-zinc-700 p-2">
									<p className="text-sm">{message.message}</p>
								</div>
							</div>
						))}
						{/* <div className="flex items-end gap-2">
							<div className="rounded-lg bg-zinc-200 dark:bg-zinc-700 p-2">
								<p className="text-sm">Hello, how are you?</p>
							</div>
						</div>
						<div className="flex items-end gap-2 justify-end">
							<div className="rounded-lg bg-blue-500 text-white p-2">
								<p className="text-sm">I'm fine, thanks for asking!</p>
							</div>
						</div> */}
					</div>
				</main>
				<footer className="border-t dark:border-zinc-700 p-4">
					<div className="flex items-center gap-2">
						<Button>
							<IconEmojiHappy className="w-6 h-6" />
						</Button>
						<Input
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							className="flex-1"
							placeholder="Type a message..."
						/>
						<Button onClick={handleSend}>Send</Button>
					</div>
				</footer>
			</section>
		</div>
	);
}

function IconEmojiHappy(props: any) {
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
			<circle cx="12" cy="12" r="10" />
			<path d="M8 14s1.5 2 4 2 4-2 4-2" />
			<line x1="9" x2="9.01" y1="9" y2="9" />
			<line x1="15" x2="15.01" y1="9" y2="9" />
		</svg>
	);
}
