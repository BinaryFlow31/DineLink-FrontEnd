import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Logo from "./../../public/logos/logo-2-temp.png";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";


const AdminLogin = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
    const { LOGINADMIN, loading } = useAuth()!;

	const navigate = useNavigate();


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
        const result = await LOGINADMIN(email, password);

		setEmail("");
		setPassword("");


		console.log(result + " asjkfbaweijbq fiabf iaewb ifaewbfi ea");

		console.log(typeof(result)  + "asjkfbaweijbq fiabf iaewb ifaewbfi ea");

        if (result === true) {
			console.log("Hello");
            navigate("/admin");
        }
	};


	return (
		<div className="min-h-screen flex flex-col">
			<div className="flex flex-grow justify-center items-center p-4">
				<div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-gray-100 border border-gray-300 rounded-lg shadow-lg p-6 sm:p-8">
					<div className="flex flex-col items-center">
						<img src={Logo} alt="Logo" className="mb-6 h-16 sm:h-20" />
						<h1 className="text-2xl sm:text-3xl uppercase font-bold mb-4 font-serif leading-snug text-center">
							Admin Login
						</h1>

						{/* Email Input */}
						<Input
							type="email"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="mb-4 w-full border border-gray-300 rounded-lg p-3 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>

						{/* Password Input */}
						<Input
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="mb-4 w-full border border-gray-300 rounded-lg p-3 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>

						{/* Login Button */}
						<Button
							onClick={handleLogin}
							disabled={!email || !password}
							className="mb-4 w-full sm:w-3/4 transition duration-300 ease-in-out transform bg-[#F3274C] hover:scale-105 text-white py-2"
						>
							{loading ? <Loader /> : "Login"}
						</Button>

						{/* Forgot Password Link */}
						<Link to="/forgot-password" className="text-blue-500 mb-2 text-sm sm:text-base">
							Forgot Password?
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminLogin;
