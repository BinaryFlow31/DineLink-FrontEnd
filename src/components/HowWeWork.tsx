import Steps from "./Steps";

const HowWeWork = () => {
	return (
		<div className="max-h-screen bg-[url('/banners/banner2.png')] bg-cover bg-center text-center rounded-none py-4">
			<h3 className='text-white text-sm px-2 uppercase font-semibold'>
				Easy Order in 3 steps
			</h3>
			<h1 className='text-white capitalize font-bold text-2xl tracking-widest mt-1'>
				How we work
			</h1>

			<div className="w-full flex justify-center items-center gap-8 flex-col mt-4">
				<Steps head="Explore Menu" para1="Indulge in a world of flavors!" para2="Explore our vast menu." image="/banners/howwework1.png"/>
				<Steps head="Choose A Dish" para1="From classic favorites to chef's specials," para2="choose a dish that delights your taste buds." image="/banners/howwework2.png"/>
				<Steps head="Place Order" para1=" Place your order now and" para2="enjoy a meal made with love!" image="/banners/howwework2.png"/>
			</div>
		</div>
	);
};

export default HowWeWork;
