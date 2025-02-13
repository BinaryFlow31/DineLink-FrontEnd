import { GiCupcake } from "react-icons/gi";
import CategoryName from "./CategoryName";
import { MdFreeBreakfast } from "react-icons/md";
import { MdDinnerDining } from "react-icons/md";
import { FaBowlFood } from "react-icons/fa6";
import { IoBeer } from "react-icons/io5";
import { useState } from "react";


const MenuCategory = () => {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
	return (
		<div className='flex flex-wrap justify-center gap-2 mx-2'>
			{/* Each child div will represent one part */}
			<CategoryName activeCatName = {activeCategory} setCat = {setActiveCategory} catName="Desserts" ><GiCupcake className="w-8 h-8"/></CategoryName>
            <CategoryName activeCatName = {activeCategory} setCat = {setActiveCategory} catName="Breakfast" ><MdFreeBreakfast className="w-8 h-8"/></CategoryName>
            <CategoryName activeCatName = {activeCategory} setCat = {setActiveCategory} catName="Lunch" ><FaBowlFood className="w-8 h-8"/></CategoryName>
            <CategoryName activeCatName = {activeCategory} setCat = {setActiveCategory} catName="Dinner" ><MdDinnerDining className="w-8 h-8"/></CategoryName>
            <CategoryName activeCatName = {activeCategory} setCat = {setActiveCategory} catName="Breverage" ><IoBeer className="w-8 h-8"/></CategoryName>
			
		</div>
	);
};

export default MenuCategory;
