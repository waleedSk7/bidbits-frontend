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
		const { data: bids } = await axios.get(
			process.env.backendUrl + "/api/v1/bids/" + userId
		);
		console.log(bids);
		return Response.json({
			bids: bids,
		});
	} catch (error: any) {
		console.log(error);
		return Response.json({
			error: error,
		});
	}
}
