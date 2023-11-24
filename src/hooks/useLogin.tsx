import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { provider } from "@/firebase";
import axios from "axios";

const useLogin = () => {
	const auth = getAuth();
	const handleLogin = async () => {
		signInWithPopup(auth, provider)
			.then((result) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential?.accessToken;
				// The signed-in user info.
				const user = result.user;
				// get email here
				const email = user.email;
				if (!email) {
					return;
				}

				// check if email starts with f and ends with @hyderabad.bits-pilani.ac.in
				if (
					email.startsWith("f") &&
					email.endsWith("@hyderabad.bits-pilani.ac.in")
				) {
					axios
						.post("/api/login", {
							email: email,
							name: user.displayName,
							photoURL: user.photoURL,
							uid: user.uid,
						})
						.then((res) => {
							console.log(res.data.login);
							if (res.data.login) {
								window.location.href = "/products";
								localStorage.setItem(
									"user",
									JSON.stringify(res.data.login.userId)
								);
							} else {
								window.location.href = "/login";
								alert("Login Failed");
							}
						})
						.catch((err) => {
							console.log(err);
						});
				} else {
					// show error message
				}
			})
			.catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.customData.email;
				// The AuthCredential type that was used.
				const credential = GoogleAuthProvider.credentialFromError(error);
				// ...
			});
	};
	const checkLogin = async () => {
		const user = JSON.parse(localStorage.getItem("user") || "{}");
		console.log(user);
		if (user) {
			axios
				.post("/api/checkLogin", {
					userId: user,
				})
				.then((res) => {
					console.log(res.data.login);
					if (res.data.login) {
						return;
					} else {
						window.location.href = "/login";
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};
	return { handleLogin, checkLogin };
};

export default useLogin;
