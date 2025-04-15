import { MenuItemType } from "@/types/MenuItemType";

const MenuItemsCard = ({menuItems, quantities, setQuantities}: {menuItems: MenuItemType[], quantities: Record<number, number>, setQuantities: React.Dispatch<React.SetStateAction<Record<number, number>>>;}) => {
	// Initialize state for quantities
	

	// Function to handle quantity increase
	const increaseQuantity = (index: number) => {
		setQuantities((prev) => ({
			...prev,
			[index]: (prev[index] || 0) + 1,
		}));
	};

	// Function to handle quantity decrease
	const decreaseQuantity = (index: number) => {
		setQuantities((prev) => ({
			...prev,
			[index]: Math.max((prev[index] || 0) - 1, 0),
		}));
	};

	return (
		<div className='flex flex-col md:flex-row bg-gray-100 rounded-lg shadow-lg p-6 w-full max-w-4xl mx-auto'>
			{/* Left Side: Image */}
			<div className='w-full md:w-1/2 flex justify-center'>
				<img
					src='/menu-items/item1.png.png'
					alt='BBQ Dish'
					className='rounded-lg object-cover'
				/>
			</div>

			{/* Right Side: Menu List */}
			<div className='w-full md:w-1/2 flex flex-col justify-center px-6'>
				<h2 className='text-2xl font-bold mb-4'>South Indian</h2>

				{menuItems.map((item, index) => (
					<div key={index} className='mb-4'>
						<div className='flex justify-between items-center'>
							<p className='font-bold'>{item.name}</p>
							<div className='flex items-center gap-2'>
								<p className='text-red-500 font-bold'>
									{item.price}
								</p>
								<div className='flex items-center border border-gray-300 rounded-md'>
									<button
										onClick={() => decreaseQuantity(index)}
										className='px-2 py-1 text-gray-600 hover:bg-gray-200'
										disabled={quantities[index] === 0}
									>
										-
									</button>
									<span className='px-2 py-1'>
										{quantities[index] || 0}
									</span>
									<button
										onClick={() => increaseQuantity(index)}
										className='px-2 py-1 text-gray-600 hover:bg-gray-200'
									>
										+
									</button>
								</div>
							</div>
						</div>
						<p className='text-gray-600 text-sm'>
							{item.description}
						</p>
						{index !== menuItems.length - 1 && (
							<hr className='border-dashed border-gray-400 my-3' />
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default MenuItemsCard;
