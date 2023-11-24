import axios from "axios";
export async function POST(request: Request) {
	const body = await request.json();
	try {
		const response = await axios.post(
			process.env.backendUrl + "/api/v1/users/",
			{
				email: body.email,
				name: body.name,
				campusId: body.email.split("@")[0],
			}
		);
		return Response.json({
			login: response.data,
		});
	} catch (error) {
		return Response.json({
			error: error,
		});
	}
}
