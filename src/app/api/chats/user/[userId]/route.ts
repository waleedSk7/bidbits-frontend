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
			product.messages = message.data;
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
