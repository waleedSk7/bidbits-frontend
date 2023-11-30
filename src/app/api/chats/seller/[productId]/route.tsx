import axios from "axios";
import Product from "@/Types/product";
import Message from "@/Types/message";
import User from "@/Types/user";
export async function GET(
	request: Request,
	{ params }: { params: { productId: string } }
) {
	const { productId } = params;
	console.log(productId);
	try {
		const {
			data,
		}: {
			data: Message[];
		} = await axios.get(
			process.env.backendUrl + "/api/v1/messages/product?productId=" + productId
		);

		const { data: product } = await axios.get(
			process.env.backendUrl + "/api/v1/products/?productId=" + productId
		);
		const userId = product.user.userId;
		const chats: Record<User["userId"], Message[]> = {};
		for (const message of data) {
			const handleUserMessgae = (addMessage: Message, checkId: number) => {
				if (!chats[checkId]) {
					chats[checkId] = [];
				}
				chats[checkId].push(addMessage);
			};
			if (message.sender.userId === userId) {
				handleUserMessgae(message, message.receiver.userId);
			}
			if (message.receiver.userId === userId) {
				handleUserMessgae(message, message.sender.userId);
			}
		}
		console.log(chats);
		return Response.json({
			userMessages: chats,
		});
		// console.log({ highestBid, messages });
		// return Response.json({
		// 	highestBid: highestBid,
		// 	messages: messages.sort((a, b) => {
		// 		return (
		// 			new Date(a.timestamp.toString()).getTime() -
		// 			new Date(b.timestamp.toString()).getTime()
		// 		);
		// 	}),
		// 	bidder: bidder,
		// });

		// for (const product of products) {
		// 	const message: { data: Message[] } = await axios.get(
		// 		process.env.backendUrl +
		// 			"/api/v1/messages/senderAndProduct?productId=" +
		// 			product.productId +
		// 			"&senderId=" +
		// 			userId
		// 	);
		// 	product.messages = message.data.sort((a, b) => {
		// 		return (
		// 			new Date(a.timestamp.toString()).getTime() -
		// 			new Date(b.timestamp.toString()).getTime()
		// 		);
		// 	});
		// }
		// return Response.json({
		// 	products: products,
		// });
	} catch (error: any) {
		console.log(error);
		return Response.json({
			error: error,
		});
	}
}
