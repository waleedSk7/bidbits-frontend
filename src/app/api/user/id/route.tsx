import axios from "axios";

export async function POST(req: Request) {
	const { userId, campusId } = await req.json();
	console.log(campusId);
	try {
		const response = await axios.post(
			process.env.backendUrl +
				"/api/v1/users/setCampusId?userId=" +
				userId +
				"&campusId=" +
				campusId
		);
		console.log("hey", response.data);
		return Response.json(response.data);
	} catch (error) {
		return Response.json({
			error: error,
		});
	}
}
