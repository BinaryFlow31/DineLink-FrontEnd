import { useSpring, animated } from "@react-spring/web";
interface StatCardProps {
	title: string;
	value: number;
	percentage: number;
	icon: JSX.Element;
	bgColor: string;
}

const StatCard: React.FC<StatCardProps> = ({
	title,
	value,
	percentage,
	icon,
	bgColor,
}) => {

    const { number } = useSpring({
        from: { number: 0 },
        to: { number: value },
        config: { tension: 120, friction: 14 },
      });

	return (
		<div className='flex flex-col p-4 bg-white rounded-2xl shadow-md w-full sm:w-[100%] lg:w-[100%] h-full'>
			<div className='flex justify-between items-center'>
				<h2 className='text-xl font-semibold'>
                <animated.span>{number.to((n) => n.toFixed(0))}</animated.span>
				</h2>
				<div className={`p-3 rounded-lg text-white ${bgColor}`}>
					{icon}
				</div>
			</div>
			<p className='text-gray-500 text-sm mt-1'>{title}</p>
			<div className='w-full bg-gray-200 rounded-full h-2 mt-2'>
				<div
					className={`h-2 rounded-full ${bgColor}`}
					style={{ width: `${percentage}%` }}
				></div>
			</div>
			<p className='text-xs text-gray-500 mt-1'>
				0% <span className='float-right'>{percentage}%</span>
			</p>
		</div>
	);
};

export default StatCard;
