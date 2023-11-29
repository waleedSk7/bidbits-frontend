"use client";
import ProfileChat from "@/Types/ProfileChat";
import Message from "@/Types/message";
import IconEmojiHappy from "@/components/IconEmojiHappy";
import useLogin from "@/hooks/useLogin";
import { Button, Input } from "@mui/material";
import axios from "axios";
import * as React from "react";

export interface IChatWithHigestBidderProps {
	params: { productId: string };
}
async function getProductDataAndMessages(productId: string) {
	const productRes = await fetch(`/api/products/${productId}`);
	const product = await productRes.json();
	const messagesRes = await fetch(`/api/chats/product/${productId}`);
	const messages = await messagesRes.json();
	return { product, messages };
}

export default function ChatWithHigestBidder(
	props: IChatWithHigestBidderProps
) {
	const { checkLogin } = useLogin();
	const [chatProfile, setChatProfile] = React.useState<ProfileChat>();
	const [message, setMessage] = React.useState("");
	const fetchMessages = async () => {
		const res = await fetch("/api/chats/seller/" + props.params.productId, {
			cache: "no-cache",
		});
		const { highestBid, messages } = await res.json();
		console.log({ highestBid, messages });

		const response = await axios.get(`/api/products/${props.params.productId}`);
		const { product } = await response.data;

		setChatProfile({
			product: product,
			highestBid: highestBid,
			messages: messages,
		});
	};
	React.useEffect(() => {
		checkLogin();
		fetchMessages();
	}, []);
	React.useEffect(() => {
		console.log(chatProfile);
	}, [chatProfile]);

	const handleFreeze = async () => {
		try {
			const response = await axios.put(`/api/products/`, {
				userId: Number(localStorage.getItem("user")),
				productId: props.params.productId,
			});
			const data = await response.data;
			if (data.error) {
				alert(data.error);
				return;
			}
			fetchMessages();
			alert("Bid has been frozen");
		} catch (error) {
			console.log(error);
		}
	};

	const handleSend = async () => {
		if (!chatProfile) {
			return;
		}
		if (!message) {
			return;
		}
		const res = await fetch("/api/chats/user/" + localStorage.getItem("user"), {
			method: "POST",
			body: JSON.stringify({
				productId: chatProfile.product.productId,
				message: message,
				receiverId: chatProfile.product.user.userId,
			}),
			cache: "no-cache",
		});
		setMessage("");
		await fetchMessages();
	};

	return (
		<main className="flex-1 overflow-auto p-4 pt-20 h-screen">
			<section className="flex flex-col w-full h-full">
				<header className="border-b dark:border-zinc-700 p-4 flex justify-between">
					<h2 className="text-xl font-bold">
						{chatProfile?.product.productName}, bid at Rs.{" "}
						{chatProfile?.highestBid}
					</h2>
					<Button
						color={"warning"}
						disabled={chatProfile?.product.sold}
						onClick={handleFreeze}
					>
						{chatProfile?.product.sold ? "Frozen" : "Freeze"} Bid
					</Button>
				</header>
				<main className="flex-1 overflow-auto p-4 h-full">
					<div className="space-y-4">
						{chatProfile?.messages.map((message: Message) => (
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
		</main>
	);
}
