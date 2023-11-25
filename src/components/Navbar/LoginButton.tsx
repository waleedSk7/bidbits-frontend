"use client";
import useLogin from "@/hooks/useLogin";
import axios from "axios";
import React from "react";
import Link from "next/link";

export default function LoginButton() {
	const [loggedIn, setLoggedIn] = React.useState(false);
	const { checkLoginWIthoutRedirect } = useLogin();
	React.useEffect(() => {
		checkLoginWIthoutRedirect().then((res) => {
			setLoggedIn(res);
		});
	}, []);
	return (
		<Link
			className="text-sm font-medium hover:underline underline-offset-4"
			href={loggedIn ? "/profile" : "/login"}
		>
			{loggedIn ? "Profile" : "Login"}
		</Link>
	);
}
