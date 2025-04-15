import { useState } from "react";

import { X } from "lucide-react";
import { PiHamburgerBold } from "react-icons/pi";
import { LuCookingPot } from "react-icons/lu";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

const Header = ({
	size,
	selectedItems,
}: {
	size: number;
	selectedItems: {
		name: string;
		description: string;
		price: string;
		quantity: number;
	}[];
}) => {
	const [menuOpen, setMenuOpen] = useState(false);

	const handleToggle = () => {
		setMenuOpen(!menuOpen);
	};

	return (
		<header className='flex shadow-lg py-4 px-2 sm:px-10 bg-white font-sans min-h-[100px] tracking-wide relative z-50'>
			<div className='flex flex-wrap items-center justify-between gap-1 w-full'>
				{/* Logo for larger screens */}
				<Link to='/admin' className='max-sm:hidden'>
					<img
						src='/logos/logo-2-temp.png'
						alt='logo'
						className='w-36'
					/>
				</Link>
				{/* Logo for small screens */}
				<Link to='/admin' className='hidden max-sm:block'>
					<img
						src='/logos/logo_temp.png'
						alt='logo'
						className='w-16'
					/>
				</Link>

				{/* Navigation Menu */}
				<div
					className={`max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50 transition-all duration-300 ${
						menuOpen ? "block" : "hidden lg:block"
					}`}
				>
					{/* Navigation Links */}
					<ul className='lg:flex gap-x-5 max-lg:space-y-3'>
						<li className='mb-6 hidden max-lg:block'>
							<Link to='#'>
								<img
									src='/logos/logo-2-temp.png'
									alt='logo'
									className='w-48'
								/>
							</Link>
						</li>
						{[
							"Home",
							"Menu",
							"Orders",
							"Payments",
							"About",
							"Contact",
						].map((item, index) => (
							<li
								key={index}
								className='max-lg:border-b border-gray-300 max-lg:py-3 px-3'
							>
								<Link
									to='#'
									className={`hover:text-[#007bff] block font-semibold text-[15px] ${
										item === "Home"
											? "text-[#007bff]"
											: "text-gray-500"
									}`}
								>
									{item}
								</Link>
							</li>
						))}
					</ul>
				</div>

				{/* Buttons and Mobile Menu Toggle */}
				<div className='flex max-lg:ml-auto space-x-4'>
					{/* Cart Button */}
					<SearchBar />
					<Link to='/cart' state={{ selectedItems }}>
						<button className='lg:hidden bg-white border-2 border-double border-stone-300 rounded-full focus:border-stone-800 relative'>
							<LuCookingPot className='w-5 h-6' />
							{size > 0 && (
								<span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
									{size}
								</span>
							)}
						</button>
					</Link>

					{/* Hamburger Menu */}
					<button
						onClick={handleToggle}
						className='lg:hidden bg-white border-2 border-double border-stone-300 rounded-full focus:border-stone-800'
					>
						{!menuOpen ? (
							<PiHamburgerBold className='w-5 h-6' />
						) : (
							<X className='w-5 h-6' />
						)}
					</button>
				</div>
			</div>
		</header>
	);
};

export default Header;
