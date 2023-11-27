"use client";
import User from "@/Types/user";
import ProductCard from "@/components/ProductCard";
import useLogin from "@/hooks/useLogin";
import Image from "next/image";
import React from "react";

const ProfilePage: React.FC = () => {
	const [products, setProducts] = React.useState([]);
	const [editShown, setEditShown] = React.useState<"id" | "hostel" | null>(
		null
	);
	const [editValue, setEditValue] = React.useState("");
	const [chats, setChats] = React.useState([]);
	const [user, setUser] = React.useState<User | null>(null);

	const { checkLogin } = useLogin();

	const getUser = async () => {
		const res = await fetch("/api/user/", {
			method: "POST",
			body: JSON.stringify({ userId: localStorage.getItem("user") }),
			cache: "no-cache",
		});
		const data = await res.json();
		console.log(data);
		setUser(data);
	};

	const getProducts = async () => {
		const res = await fetch(
			"/api/products/user/" + localStorage.getItem("user"),
			{
				cache: "no-cache",
			}
		);
		const data = await res.json();
		console.log(data);
		setProducts(data.products);
	};

	const getChats = async () => {
		const res = await fetch("/api/chats/user/" + localStorage.getItem("user"), {
			cache: "no-cache",
		});
		const data = await res.json();
		console.log(data);
		setChats(data.chats);
	};

	const handleEdit = (type: "id" | "hostel") => {
		if (user) {
			setEditShown(type);
			setEditValue(type === "id" ? user?.campusID : user?.hostel);
		}
	};

	const handleSave = async () => {
		if (editShown === "id") {
			const res = await fetch("/api/user/id/", {
				method: "POST",
				body: JSON.stringify({
					campusId: editValue,
					userId: localStorage.getItem("user"),
				}),
				cache: "no-cache",
			});
			const data = await res.json();
			console.log(data);
			if (data.campusID === editValue) {
				alert("Campus ID updated successfully");
				setEditShown(null);
				getUser();
			} else {
				alert("Error updating campus ID");
			}
		} else if (editShown === "hostel") {
			const res = await fetch("/api/user/hostel/", {
				method: "POST",
				body: JSON.stringify({
					hostel: editValue,
					userId: localStorage.getItem("user"),
				}),
				cache: "no-cache",
			});
			const data = await res.json();
			console.log(data);
			if (data.hostel === editValue) {
				alert("Hostel updated successfully");
				setEditShown(null);
				getUser();
			} else {
				alert("Error updating hostel");
			}
		}
	};

	React.useEffect(() => {
		getUser();
		checkLogin();
		getProducts();
	}, []);

	return (
		<main className="flex min-h-screen flex-col items-center p-12">
			{/* A modal to input campus id and hostel */}
			{editShown && (
				<div className="fixed inset-0 z-50 flex items-center justify-center w-screen h-screen bg-black bg-opacity-50">
					<div className="bg-white p-10 rounded-md">
						<h1 className="text-2xl font-bold mb-4">Edit {editShown}</h1>
						<div className="flex flex-col gap-4">
							<input
								type="text"
								placeholder={editShown.toLocaleUpperCase()}
								value={editShown === "id" ? user?.campusID : user?.hostel}
								onChange={(e) => setEditValue(e.target.value)}
								className="border rounded-md p-2"
							/>
							<button
								className="text-white bg-green-900 rounded-md p-2"
								onClick={handleSave}
							>
								Save
							</button>
							<button
								className="bg-zinc-500 text-white rounded-md p-2"
								onClick={() => {
									setEditShown(null);
								}}
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}
			{user && (
				<div className="flex flex-col ">
					<main className="flex-1">
						<section className="w-full py-5 sm:py-10 md:py-10 xl:py-10">
							<div className="container px-4 md:px-6">
								<div className="flex flex-col items-center space-y-4 text-center">
									<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
										Welcome to BID BITS, {user?.name}
									</h1>
									<p className="mx-auto max-w-[700px] text-zinc-500 md:text-xl dark:text-zinc-400">
										You can view your product listings and chat with the highest
										bidders here.
									</p>
								</div>
							</div>
						</section>
					</main>
				</div>
			)}
			{/* A section to edit hostel and campus ID */}
			{user && (
				<div className="flex flex-col items-center justify-center w-full">
					<div className="container px-4 md:px-6">
						<div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
							<div className="card border rounded-lg overflow-hidden">
								<div className="p-6 space-y-2">
									<h3 className="text-lg font-semibold">Edit Profile</h3>
									<p className="text-sm text-zinc-500 dark:text-zinc-400">
										Edit your profile here.
									</p>
									<div className="flex flex-col sm:flex-row items-center gap-10 max-h-fit overflow-x-scroll max-w-full">
										<div className="card border rounded-lg overflow-hidden">
											<div className="p-6 space-y-2">
												<h3 className="text-lg font-semibold">
													Hostel {user.hostel}
												</h3>
												<p
													className="text-sm text-zinc-500 dark:text-zinc-400"
													onClick={() => handleEdit("hostel")}
												>
													Edit your hostel here.
												</p>
											</div>
										</div>
										<div className="card border rounded-lg overflow-hidden">
											<div className="p-6 space-y-2">
												<h3 className="text-lg font-semibold">
													Campus ID {user.campusID}
												</h3>
												<p
													className="text-sm text-zinc-500 dark:text-zinc-400"
													onClick={() => handleEdit("id")}
												>
													Edit your campus ID here.
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
			{/* 
                A tabbed section for the user to view their products and chats
            */}
			<div className="flex flex-col items-center justify-center w-full">
				<div className="container px-4 md:px-6">
					<div className="grid grid-cols-1  lg:grid-cols-1 gap-4">
						<div className="card border rounded-lg overflow-hidden">
							<div className="p-6 space-y-2">
								<h3 className="text-lg font-semibold">Products</h3>
								<p className="text-sm text-zinc-500 dark:text-zinc-400">
									View and manage your products here.
								</p>
								<div className="flex items-center gap-10 max-h-fit overflow-x-scroll max-w-full">
									{products.length > 0 ? (
										products.map((product: any) => (
											<ProductCard product={product} key={product.productId} />
										))
									) : (
										<div className="card border rounded-lg overflow-hidden">
											<div className="p-6 space-y-2">
												<h3 className="text-lg font-semibold">No Products</h3>
												<p className="text-sm text-zinc-500 dark:text-zinc-400">
													You have not listed any products yet.
												</p>
											</div>
										</div>
									)}
								</div>
								<div className="p-6 space-y-2">
									<h3 className="text-lg font-semibold">Chats</h3>
									<p className="text-sm text-zinc-500 dark:text-zinc-400">
										Chat with bidders here.
									</p>
									<div className="flex items-center gap-10 max-h-fit overflow-x-scroll max-w-full">
										{chats.length > 0 ? (
											chats.map((chat: any) => (
												<div className="card border rounded-lg overflow-hidden">
													<Image
														src={
															"https://ucarecdn.com/" + chat.product.image + "/"
														}
														width={400}
														height={300}
														className="object-cover"
														alt="Product"
													/>
													<div className="p-6 space-y-2">
														<h3 className="text-lg font-semibold">
															{chat.product.productName}
														</h3>
													</div>
												</div>
											))
										) : (
											<div className="p-6 space-y-2">
												<h3 className="text-lg font-semibold">No Chats</h3>
												<p className="text-sm text-zinc-500 dark:text-zinc-400">
													You have no chats yet.
												</p>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default ProfilePage;
