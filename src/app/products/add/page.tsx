"use client";
import useLogin from "@/hooks/useLogin";
import React, { useState } from "react";
import axios from "axios";
import { uploadDirect } from "@uploadcare/upload-client";

// fileData must be `Blob` or `File` or `Buffer`

const AddProductPage: React.FC = () => {
	const [uploading, setUploading] = useState(false);
	const { checkLogin } = useLogin();
	React.useEffect(() => {
		checkLogin();
	}, []);

	// ! refs
	const nameRef = React.useRef<HTMLInputElement>(null);
	const descriptionRef = React.useRef<HTMLTextAreaElement>(null);
	const startingBidRef = React.useRef<HTMLInputElement>(null);
	const categoryRef = React.useRef<HTMLSelectElement>(null);
	const imageRef = React.useRef<HTMLInputElement>(null);
	const displaImageRef = React.useRef<HTMLImageElement>(null);

	const Categories = [
		{ id: 1, name: "Clothing & Apparel" },
		{ id: 2, name: "Footwear & Shoes" },
		{ id: 3, name: "Electronics & Gadgets" },
		{ id: 4, name: "Games & Toys" },
		{ id: 5, name: "Veterinary & Pet Items" },
		{ id: 6, name: "Stationary & Books" },
		{ id: 7, name: "Furniture" },
		{ id: 8, name: "Hand & Power Tools" },
		{ id: 9, name: "Tupperware" },
		{ id: 10, name: "Sports Products" },
		{ id: 11, name: "Others" },
	];

	const handleAddProduct = async () => {
		if (
			nameRef.current &&
			descriptionRef.current &&
			startingBidRef.current &&
			categoryRef.current &&
			imageRef.current
		) {
			setUploading(true);
			const name = nameRef.current.value;
			const description = descriptionRef.current.value;
			const startingBid = startingBidRef.current.value;
			const category = categoryRef.current.value;
			const image =
				imageRef.current.files?.[0] !== undefined
					? await imageRef.current.files?.[0]
					: null;
			if (!image) {
				return;
			}

			const result = await uploadDirect(image, {
				publicKey: "01a3defba00679b752db",
				store: "auto",
			});

			const uuid = result.uuid;

			axios
				.post("/api/products", {
					name,
					description,
					startingBid,
					category,
					image: uuid,
					userId: Number(localStorage.getItem("user")),
				})
				.then((res) => {
					console.log(res.data);
					setUploading(false);
					window.location.href = "/products";
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	return (
		<div className="max-w-md mx-auto p-4 py-20 min-h-[100vh]">
			{uploading && (
				<div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
					<div className="bg-white p-4 rounded-md">
						<h1 className="text-2xl font-bold mb-4">Uploading...</h1>
						<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
					</div>
				</div>
			)}
			<h1 className="text-2xl font-bold mb-4">Add New Product</h1>
			<form>
				<div className="mb-4">
					<label htmlFor="category" className="block mb-2 font-medium">
						Category:
					</label>
					<select
						id="category"
						ref={categoryRef}
						className="border border-gray-300 rounded-md p-2 w-full"
					>
						{Categories.map((category) => (
							<option key={category.id} value={category.name}>
								{category.name}
							</option>
						))}
					</select>
					<label htmlFor="Image" className="block mb-2 font-medium">
						Image:
					</label>
					<input
						ref={imageRef}
						onChange={(e) => {
							if (displaImageRef.current && e.target.files) {
								displaImageRef.current.src = URL.createObjectURL(
									e.target.files[0]
								);
							}
						}}
						type="file"
						id="Image"
						className="border border-gray-300 rounded-md p-2 w-full"
					/>
					<img
						ref={displaImageRef}
						src=""
						alt=""
						className="border border-gray-300 h-32 object-contain rounded-md p-2 w-full"
					/>

					<label htmlFor="name" className="block mb-2 font-medium">
						Name:
					</label>
					<input
						ref={nameRef}
						type="text"
						id="name"
						className="border border-gray-300 rounded-md p-2 w-full"
					/>
				</div>

				<div className="mb-4">
					<label htmlFor="description" className="block mb-2 font-medium">
						Description:
					</label>
					<textarea
						id="description"
						ref={descriptionRef}
						className="border border-gray-300 rounded-md p-2 w-full"
					></textarea>
				</div>

				<div className="mb-4">
					<label htmlFor="startingBid" className="block mb-2 font-medium">
						Starting Bid (in Rs):
					</label>
					<input
						ref={startingBidRef}
						type="number"
						id="startingBid"
						className="border border-gray-300 rounded-md p-2 w-full"
					/>
				</div>

				<button
					type="button"
					onClick={handleAddProduct}
					className="bg-blue-500 text-white px-4 py-2 rounded-md"
				>
					Add Product
				</button>
			</form>
		</div>
	);
};
export default AddProductPage;
