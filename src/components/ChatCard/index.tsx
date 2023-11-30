import ProfileChat from "@/Types/ProfileChat";
import * as React from "react";

export interface IChatCardProfileProps {
	chat: ProfileChat["userMessages"][1];
	product: ProfileChat["product"];
	name: string;
	userId: string;
}

export default function ChatCardProfile(props: IChatCardProfileProps) {
	const { chat } = props;
	return (
		<div
			className="card rounded-lg border overflow-hidden min-w-max"
			onClick={() =>
				(window.location.href =
					"/chat/" + props.product.productId + "/" + props.userId)
			}
		>
			<div className="flex items-center gap-4 p-4">
				<div className="w-12 h-12 rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden">
					<img
						src={"https://ucarecdn.com/" + props.product.image + "/"}
						alt="Product"
						className="object-cover w-full h-full"
					/>
				</div>
				<div className="flex-1">
					<h3 className="text-lg font-semibold">{props.name}</h3>
					<p className="text-sm text-zinc-500 dark:text-zinc-400">
						{chat && chat.length > 0 && chat[0].message}
					</p>
				</div>
				<div className="flex flex-col items-end">
					{props.product.productName}
				</div>
			</div>
		</div>
	);
}
