import axios from "axios";

export async function GET(
	request: Request,
	{ params }: { params: { userId: string } }
) {
	const { userId } = params;
	console.log(userId);
	try {
		const response = await axios.get(
			process.env.backendUrl + "/api/v1/products/user?userId=" + userId
		);
		console.log(response.data);
		return Response.json({
			products: response.data,
		});
	} catch (error: any) {
		console.log(error.response.data);
		return Response.json({
			error: error,
		});
	}
}
