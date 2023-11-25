import axios from "axios";

export async function GET(request: Request) {
	const featuredProducts = await axios.get(
		process.env.backendUrl + "/api/v1/products/featured"
	);
	console.log(featuredProducts.data);
	return Response.json({
		products: featuredProducts.data,
	});
}
