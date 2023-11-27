import axios from "axios";
import Product from "@/Types/product";
import Message from "@/Types/message";
export async function GET(
	request: Request,
	{ params }: { params: { productId: string } }
) {
	const { productId } = params;
	console.log(productId);
	try {
		const {
			data: { highestBid, messages },
		}: {
			data: {
				highestBid: number;
				messages: Message[];
			};
		} = await axios.get(
			process.env.backendUrl +
				"/api/v1/messages/highestBid?productId=" +
				productId
		);
		console.log({ highestBid, messages });
		return Response.json({
			highestBid: highestBid,
			messages: messages,
		});

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
