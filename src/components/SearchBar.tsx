import { useState } from "react";
import { Input } from "@/components/ui/input"; // ShadCN Input
import { Search, X } from "lucide-react"; // Lucide Icons

const SearchBar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [query, setQuery] = useState("");

	return (
		<div className='relative flex items-center'>
			{/* Mobile Search Icon */}
			{!isOpen && (
				<button
					className='lg:hidden p-1 text-gray-700 hover:text-black transition bg-white border-2 border-double border-stone-300 rounded-full focus:border-stone-800'
					onClick={() => setIsOpen(true)}
				>
					<Search className='w-4 h-6' />
				</button>
			)}

			{/* Search Input */}
			<div
				className={`flex items-center transition-all ${
					isOpen ? "w-45" : "w-0 lg:w-45"
				} overflow-hidden`}
			>
				<Input
					type='text'
					placeholder='Search Food'
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					className='w-full border rounded-lg py-4 text-sm focus:outline-none'
				/>
				{isOpen && (
					<button
						className='ml-2 text-gray-500 hover:text-black transition bg-white border-2 border-double border-stone-300 rounded-full focus:border-stone-800'
						onClick={() => {
							setQuery("");
							setIsOpen(false);
						}}
					>
						<X className='h-6 w-4' />
					</button>
				)}
			</div>
		</div>
	);
};

export default SearchBar;
