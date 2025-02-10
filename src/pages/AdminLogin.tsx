import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Logo from "./../../public/logos/logo-2-temp.png";
import Loader from "@/components/Loader";

const AdminLogin = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const { LOGINADMIN, LOGINUSER } = useAuth()!;

	const handleLogin = async () => {
		if (!email || !password) {
			toast.error("Please fill in all fields");
			return;
		}
		if (!/\S+@\S+\.\S+/.test(email)) {
			toast.error("Invalid email address");
			return;
		}
		if (password.length < 6) {
			toast.error("Password must be at least 6 characters");
			return;
		}

		// Simulate API call
		performLogin(email, password);
	};

	const performLogin = async (email: string, password: string) => {
		setIsLoading(true);

		try {
			const res = await fetch("http://localhost:8080/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					// "Access-Control-Allow-Headers":
					// 	"Content-Type, Authorization",
					// "Access-Control-Allow-Origin": "*",
					// "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
				},
				body: JSON.stringify({ email, password }),
			});

			const result = await res.json();

			if (result.error) {
				throw new Error(result.error);
			}

			if (result) {
				// Save user data in local storage
				localStorage.setItem("logged-user", JSON.stringify(result));
				localStorage.setItem("token", btoa(`${email}:${password}`));
				if (result.role.roleId === 1) {
					LOGINADMIN(result);
				} else {
					LOGINUSER(result);
				}

				navigate("/dashboard");
				toast.success("Login successful");
			} else {
				toast.error("Unable to login");
			}

			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (error) {
			setEmail("");
			setPassword("");
			toast.error("Either email or password is incorrect");
			return;
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<div className='min-h-screen'>
			<Header />
			<div className='flex justify-center items-center mt-28'>
				<div className='flex flex-col items-center justify-center w-[40%] bg-gray-100 border border-gray-300 rounded-lg shadow-lg p-6'>
					<img src={Logo} alt='Logo' className='mb-6 h-20' />
					<h1 className='text-3xl font-bold mb-4 font-serif leading-snug'>
						Login
					</h1>
					<Input
						type='email'
						placeholder='Email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className='mb-4 w-3/4 border border-gray-300 rounded-lg p-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500'
					/>
					<Input
						type='password'
						placeholder='Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className='mb-4 w-3/4 border border-gray-300 rounded-lg p-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500'
					/>

					<Button
						onClick={handleLogin}
						disabled={!email || !password}
						className='mb-4 w-1/2 transition duration-300 ease-in-out transform hover:bg-green-600 hover:scale-105 text-white'
					>
						{isLoading ? <Loader /> : "Login"}
					</Button>

					<a href='/forgot-password' className='text-blue-500 mb-2'>
						Forgot Password?
					</a>
					<span>
						A New User?{" "}
						<Link to='/register' className='text-blue-500 mb-2'>
							Register
						</Link>
					</span>
				</div>
			</div>
		</div>
	);
};

export default AdminLogin;
