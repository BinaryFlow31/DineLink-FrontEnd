import { FaClipboardList, FaShoppingBag, FaUsers, FaChartBar } from "react-icons/fa";
import StatCard from "./StatCard";

const NumericalStats = () => {
	const stats = [
		{
			title: "Total Menus",
			value: 120,
			percentage: 45,
			icon: <FaClipboardList />,
			bgColor: "bg-black",
		},
		{
			title: "Total Orders Today",
			value: 180,
			percentage: 62,
			icon: <FaShoppingBag />,
			bgColor: "bg-purple-200 text-purple-800",
		},
		{
			title: "Total Client Today",
			value: 240,
			percentage: 80,
			icon: <FaUsers />,
			bgColor: "bg-gray-200 text-gray-800",
		},
		{
			title: "Revenue Day Ratio",
			value: 140,
			percentage: 85,
			icon: <FaChartBar />,
			bgColor: "bg-pink-200 text-pink-800",
		},
	];
	return (
		<div className='p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
			{stats.map((stat, index) => (
				<StatCard key={index} {...stat} />
			))}
		</div>
	);
};

export default NumericalStats;
