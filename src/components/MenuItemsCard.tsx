import React from "react";

interface MenuItemProps {
	name: string;
	description: string;
	price: string;
}

interface MenuItem {
	name: string;
	description: string;
	price: string;
}

interface SubCategory {
	subCategory: string;
	items: MenuItem[];
}

interface Menu {
	category: string;
	subCategories: SubCategory[];
}

const menu: Menu[] = [
	{
		category: "Desserts",
		subCategories: [
			{
				subCategory: "Traditional Sweets",
				items: [
					{
						name: "Gulab Jamun",
						description:
							"Soft, deep-fried khoya dumplings soaked in rose-flavored sugar syrup.",
						price: "$3.00",
					},
					{
						name: "Rasgulla",
						description:
							"Spongy cottage cheese balls soaked in light sugar syrup.",
						price: "$3.50",
					},
					{
						name: "Rasmalai",
						description:
							"Flattened paneer dumplings soaked in saffron-infused milk.",
						price: "$4.00",
					},
					{
						name: "Jalebi",
						description:
							"Crispy, deep-fried spirals dipped in saffron sugar syrup.",
						price: "$2.50",
					},
					{
						name: "Malpua with Rabri",
						description:
							"Sweetened pancakes served with thickened milk.",
						price: "$5.00",
					},
				],
			},
			{
				subCategory: "Halwa Varieties",
				items: [
					{
						name: "Gajar ka Halwa",
						description:
							"Carrot pudding cooked with ghee, milk, and dry fruits.",
						price: "$4.50",
					},
					{
						name: "Sooji Halwa",
						description:
							"Semolina-based pudding flavored with cardamom.",
						price: "$3.00",
					},
				],
			},
		],
	},
];

const menuItems: MenuItemProps[] = [
	{
		name: "Sake BBQ sauce",
		description: "radish, black sesame seeds, coriander",
		price: "$9.00",
	},
	{
		name: "BBQ baby back ribs",
		description: "sticky Asian glaze, charred lime, chilli cashews",
		price: "$16.00",
	},
	{
		name: "Half smoked chicken",
		description: "miso butter glaze, charred lime wedge, sake bbq",
		price: "$34.00",
	},
	{
		name: "Dusted chicken wings",
		description: "tossed in Korean hot sauce, pickled radish",
		price: "$40.00",
	},
];

const MenuItemsCard: React.FC = () => {
	return (
		<div className='flex flex-col md:flex-row bg-gray-100 rounded-lg shadow-lg p-6 w-full max-w-4xl mx-auto'>
			{/* Left Side: Image */}
			<div className='w-full md:w-1/2 flex justify-center'>
				<img
					src='/menu-items/item1.png.png' // Replace with actual image
					alt='BBQ Dish'
					className='rounded-lg object-cover'
				/>
			</div>

			{/* Right Side: Menu List */}
			<div className='w-full md:w-1/2 flex flex-col justify-center px-6'>
				<h2 className='text-2xl font-bold mb-4'>BBQ</h2>

				{menuItems.map((item, index) => (
					<div key={index} className='mb-4'>
						<div className='flex justify-between'>
							<p className='font-bold'>{item.name}</p>
							<p className='text-red-500 font-bold'>
								{item.price}
							</p>
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
