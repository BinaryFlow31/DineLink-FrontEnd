import { Button } from "./ui/button";
import { FaTruckFast } from "react-icons/fa6";

const Banner = () => {
	return (
		<div className='relative w-full'>
			<img src='/banners/banner.png' alt='banner1' className='min-h-64' />
			<div className='absolute top-0 left-0 w-full h-full flex'>
				<div className='w-3/4 flex justify-center items-start ml-12 flex-col text-left'>
					<h3 className='text-white text-sm px-2 border-2 border-red-600 rounded-md'>
						Starting at &#8377;150{" "}
					</h3>
					<h1 className='text-white capitalize font-bold text-2xl tracking-widest mt-2'>
						The best food <br /> around the city
					</h1>
					<Button className='bg-red-600 text-white mt-3'>
						<FaTruckFast />
						Order Now
					</Button>
				</div>
				<div className='w-1/4'>
					{/* Additional content can go here */}
				</div>
			</div>
		</div>
	);
};

export default Banner;
