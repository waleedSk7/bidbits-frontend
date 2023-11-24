import axios from "axios";
import {
	deleteFile,
	UploadcareSimpleAuthSchema,
} from "@uploadcare/rest-client";

export const POST = async (request: Request) => {
	const body = await request.json();
	const { name, description, startingBid, image, category, userId } = body;
	console.log(process.env.backendUrl + "/api/v1/products/?userId=" + userId);
	axios
		.post(process.env.backendUrl + "/api/v1/products/?userId=" + userId, {
			productName: name,
			description,
			startingBid: Number(startingBid),
			image,
			category,
		})
		.then((res) => {
			return Response.json({
				message: res.data,
			});
		})
		.catch(async (err) => {
			const uploadcareSimpleAuthSchema = new UploadcareSimpleAuthSchema({
				publicKey: "01a3defba00679b752db",
				secretKey: "f81189aa9c017f89caf9",
			});
			console.log(err.response.data);
			const result = await deleteFile(
				{
					uuid: image,
				},
				{ authSchema: uploadcareSimpleAuthSchema }
			);
			return Response.json({
				message: err.response.data,
			});
		});
};
