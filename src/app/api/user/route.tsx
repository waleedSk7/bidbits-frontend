import axios from "axios";

export async function POST(request: Request) {
	const { userId } = await request.json();
	console.log(userId);
	try {
		const response = await axios.get(
			process.env.backendUrl + "/api/v1/users/" + userId
		);
		console.log("hey", response.data);
		return Response.json(response.data);
	} catch (error: any) {
		console.log(error.response.data);
		return Response.json({
			error: error,
		});
	}
}
