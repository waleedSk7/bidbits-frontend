import IconEmojiHappy from "@/components/IconEmojiHappy";
import { Button, Input } from "@mui/material";
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

export default async function ChatWithHigestBidder(
	props: IChatWithHigestBidderProps
) {
	return (
		<main className="flex-1 overflow-auto p-4">
			<section className="flex flex-col w-full">
				<header className="border-b dark:border-zinc-700 p-4 flex justify-between">
					<h2 className="text-xl font-bold">Contact Name</h2>
					<Button color={"warning"}>Freeze Bid</Button>
				</header>
				<main className="flex-1 overflow-auto p-4">
					<div className="space-y-4">
						<div className="flex items-end gap-2">
							<div className="rounded-lg bg-zinc-200 dark:bg-zinc-700 p-2">
								<p className="text-sm">Hello, how are you?</p>
							</div>
						</div>
						<div className="flex items-end gap-2 justify-end">
							<div className="rounded-lg bg-blue-500 text-white p-2">
								<p className="text-sm">I'm fine, thanks for asking!</p>
							</div>
						</div>
					</div>
				</main>
				<footer className="border-t dark:border-zinc-700 p-4">
					<div className="flex items-center gap-2">
						<Button>
							<IconEmojiHappy className="w-6 h-6" />
						</Button>
						<Input className="flex-1" placeholder="Type a message..." />
						<Button>Send</Button>
					</div>
				</footer>
			</section>
		</main>
	);
}
