import axios from "axios";

export async function GET(
	request: Request,
	{ params }: { params: { productId: string } }
) {
	const { productId } = params;
	console.log(productId);
	try {
		const response = await axios.get(
			process.env.backendUrl + "/api/v1/products/?productId=" + productId
		);
		const response2 = await axios.get(
			process.env.backendUrl + "/api/v1/bids/highestBid/" + productId
		);
		return Response.json({
			product: {
				...response.data,
				highestBid: response2.data,
			},
		});
	} catch (error) {
		return Response.json({
			error: error,
		});
	}
}
