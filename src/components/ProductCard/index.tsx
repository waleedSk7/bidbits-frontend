import Product from "@/Types/product";
import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({
	product,
	details,
	chat,
}: {
	product: Product;
	details?: boolean;
	chat?: boolean;
}) {
	return (
		<div
			className="rounded-md shadow-md overflow-hidden min-w-max"
			key={product.productId}
		>
			<Image
				priority
				alt="Product"
				className="object-cover"
				height="300"
				src={"https://ucarecdn.com/" + product.image + "/"}
				style={{
					aspectRatio: "400/300",
					objectFit: "cover",
				}}
				width="400"
			/>
			<div className="p-4">
				<h3 className="text-lg font-bold">{product.productName}</h3>
				<p className="text-sm text-gray-500 mt-2">{product.details}</p>
				<p className="text-sm text-gray-500 mt-2">
					Starting Bid: Rs. {product.startingBid}
				</p>
				{!product.sold && details && (
					<p className="mt-9">
						<Link href={`/products/${product.productId}`}>
							<Button className="">View Details</Button>
						</Link>
					</p>
				)}
				{product.sold && "SOLD"}
				{chat && (
					<p className="mt-9">
						<Link href={`/chat/${product.productId}`}>
							<Button className="">Chat with Highest Bidder</Button>
						</Link>
					</p>
				)}
			</div>
		</div>
	);
}
