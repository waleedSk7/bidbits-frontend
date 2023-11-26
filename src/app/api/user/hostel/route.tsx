import axios from "axios";

export async function POST(req: Request) {
	const { userId, hostel } = await req.json();
	console.log(userId);
	try {
		const response = await axios.post(
			process.env.backendUrl +
				"/api/v1/users/setHostel?userId=" +
				userId +
				"&hostel=" +
				hostel
		);
		console.log("hey", response.data);
		return Response.json(response.data);
	} catch (error) {
		return Response.json({
			error: error,
		});
	}
}
