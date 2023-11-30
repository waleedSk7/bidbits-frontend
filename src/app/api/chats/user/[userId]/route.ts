import Message from "@/Types/message";
import Product from "@/Types/product";
import axios from "axios";

export async function GET(
	request: Request,
	{ params }: { params: { userId: string } }
) {
	const { userId } = params;
	console.log(userId);
	try {
		// const { data: products }: { data: Array<Product> } = await axios.get(
		// 	process.env.backendUrl + "/api/v1/bids/products/" + userId
		// );
		// console.log(products);
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
		const { data: messages }: { data: Array<Message> } = await axios.get(
			process.env.backendUrl + "/api/v1/messages/user?userId=" + userId
		);
		const products: Record<Product["productId"], Product> = {};
		for (const message of messages) {
			if (message.product.user.userId === Number(userId)) {
				continue;
			}
			if (products[message.product.productId]) {
				products[message.product.productId].messages?.push(message);
			} else {
				const { data: product }: { data: Product } = await axios.get(
					process.env.backendUrl +
						"/api/v1/products/?productId=" +
						message.product.productId
				);
				product.messages = [message];
				products[message.product.productId] = product;
			}
		}
		for (const product of Object.values(products)) {
			product.messages = product.messages?.sort((a, b) => {
				return (
					new Date(a.timestamp.toString()).getTime() -
					new Date(b.timestamp.toString()).getTime()
				);
			});
		}
		return Response.json({
			products: Object.values(products),
		});
	} catch (error: any) {
		console.log(error);
		return Response.json({
			error: error,
		});
	}
}

export async function POST(
	request: Request,
	{ params }: { params: { userId: string } }
) {
	const { userId } = params;
	const body = await request.json();
	try {
		const response = await axios.post(
			process.env.backendUrl +
				"/api/v1/messages/?productId=" +
				body.productId +
				"&userId=" +
				userId +
				"&receiverId=" +
				body.receiverId,
			{
				message: body.message,
			}
		);
		console.log("hey");
		console.log(response.data);
		return Response.json({
			product: response.data.product,
			bid: response.data.bid,
		});
	} catch (error) {
		console.log(error);
		return Response.json({
			error: error,
		});
	}
}
