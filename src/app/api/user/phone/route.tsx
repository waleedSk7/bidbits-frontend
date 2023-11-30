import axios from "axios";

export async function POST(req: Request) {
	const { userId, phone } = await req.json();
	try {
		const response = await axios.post(
			process.env.backendUrl +
				"/api/v1/users/setPhone?userId=" +
				userId +
				"&phone=" +
				phone
		);
		console.log("hey", response.data);
		return Response.json(response.data);
	} catch (error) {
		return Response.json({
			error: error,
		});
	}
}
