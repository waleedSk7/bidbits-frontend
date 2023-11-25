import axios from "axios";

export async function POST(
	request: Request,
	{ params }: { params: { productId: string } }
) {
	const { productId } = params;
	const body = await request.json();
	try {
		console.log(
			process.env.backendUrl +
				"/api/v1/bids/?productId=" +
				productId +
				"&userId=" +
				body.userId
		);
		const response = await axios.post(
			process.env.backendUrl +
				"/api/v1/bids/?productId=" +
				productId +
				"&userId=" +
				body.userId,
			{
				bid: body.bid,
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
