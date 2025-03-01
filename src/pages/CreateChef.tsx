import { Input } from "@/components/ui/input";
import Logo from "./../../public/logos/logo-2-temp.png";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Loader from "@/components/Loader";
const CreateChef = () => {
	const [inputs, setInputs] = useState({
		name: "",
		email: "",
		password: "",
		role: "chef",
	});

	const [isLoading, setIsLoading] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInputs((prev) => ({ ...prev, [name]: value }));
	};

	const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setIsLoading(true);
		console.log(inputs);

		try {
			const response = await axios.post(
				"http://localhost:8080/api/v1/moderator",
				inputs,
				{
					headers: {
						"Content-Type": "application/json",

						"Access-Control-Allow-Headers":
							"Content-Type, Authorization",
						"Access-Control-Allow-Origin": "http://localhost:5173",
						"Access-Control-Allow-Methods":
							"OPTIONS, POST, GET, PUT",
						Authorization: `Basic ${localStorage.getItem("token")}`,
					},
				}
			);
			console.log(response);
		} catch (err) {
			console.error(err);
			toast.error("Error in creating chef!!");
		} finally {
			setIsLoading(false);
			setInputs({
				name: "",
				email: "",
				password: "",
				role: "chef",
			});
		}
	};

	return (
		<div className='min-h-screen flex flex-col'>
			<div className='flex flex-grow justify-center items-center p-4'>
				<div className='w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-gray-100 border border-gray-300 rounded-lg shadow-lg p-6 sm:p-8'>
					<form className='flex flex-col items-center'>
						<div className='flex flex-col items-center'>
							<img
								src={Logo}
								alt='Logo'
								className='mb-6 h-16 sm:h-20'
							/>
							<h1 className='text-2xl sm:text-3xl uppercase font-bold mb-4 font-serif leading-snug text-center'>
								Create Chef
							</h1>

							{/* Name Input */}
							<Input
								type='text'
								placeholder='Name'
								name='name'
								value={inputs.name}
								onChange={handleChange}
								className='mb-4 w-full border border-gray-300 rounded-lg p-3 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500'
							/>

							{/* Email Input */}
							<Input
								type='email'
								name='email'
								placeholder='Email'
								value={inputs.email}
								onChange={handleChange}
								className='mb-4 w-full border border-gray-300 rounded-lg p-3 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500'
							/>

							{/* Password Input */}
							<Input
								type='password'
								name='password'
								placeholder='Password'
								value={inputs.password}
								onChange={handleChange}
								className='mb-4 w-full border border-gray-300 rounded-lg p-3 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500'
							/>

							{/* Login Button */}
							<Button
								onClick={handleClick}
								disabled={!inputs.email || !inputs.password}
								className='mb-4 w-full sm:w-3/4 transition duration-300 ease-in-out transform bg-[#F3274C] hover:scale-105 text-white py-2'
							>
								{isLoading ? <Loader /> : "Create"}
							</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default CreateChef;
