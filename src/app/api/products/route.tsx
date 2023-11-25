import axios from "axios";
import {
	deleteFile,
	UploadcareSimpleAuthSchema,
} from "@uploadcare/rest-client";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
	const body = await request.json();
	const { name, description, startingBid, image, category, userId } = body;
	console.log(process.env.backendUrl + "/api/v1/products/?userId=" + userId);
	try {
		const res = await axios.post(
			process.env.backendUrl + "/api/v1/products/?userId=" + userId,
			{
				productName: name,
				details: description,
				startingBid: Number(startingBid),
				image,
				category,
			}
		);

		return Response.json({
			message: res.data,
		});
	} catch (err: any) {
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
		return NextResponse.json({
			message: err.response.data,
		});
	}
};

export const GET = async (request: Request) => {
	const products = await axios.get(
		process.env.backendUrl + "/api/v1/products/list"
	);
	console.log(products.data);
	return Response.json({
		products: products.data,
	});
};
