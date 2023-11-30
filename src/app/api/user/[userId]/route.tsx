import axios from "axios";
import Product from "@/Types/product";
import Message from "@/Types/message";
import User from "@/Types/user";
export async function GET(
	request: Request,
	{ params }: { params: { userId: string } }
) {
	const { userId } = params;

	console.log(userId);
	try {
		const user = await axios.get(
			process.env.backendUrl + "/api/v1/users/" + userId
		);
		console.log(user.data);
		return Response.json(user.data);
	} catch (error: any) {
		console.log(error.response.data);
		return Response.json({
			error: error,
		});
	}
}
