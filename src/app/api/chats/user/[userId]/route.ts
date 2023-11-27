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
		const { data: products }: { data: Array<Product> } = await axios.get(
			process.env.backendUrl + "/api/v1/bids/products/" + userId
		);
		console.log(products);
		for (const product of products) {
			const message: { data: Message[] } = await axios.get(
				process.env.backendUrl +
					"/api/v1/messages/senderAndProduct?productId=" +
					product.productId +
					"&senderId=" +
					userId
			);
			product.messages = message.data.sort((a, b) => {
				return (
					new Date(a.timestamp.toString()).getTime() -
					new Date(b.timestamp.toString()).getTime()
				);
			});
		}
		return Response.json({
			products: products,
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
