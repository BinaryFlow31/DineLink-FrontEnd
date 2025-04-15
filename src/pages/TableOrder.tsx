import Banner from "@/components/Banner";
import Header from "@/components/Header";
import HowWeWork from "@/components/HowWeWork";
import Menu from "@/components/Menu";
import { MenuItemType } from "@/types/MenuItemType";
import { useState } from "react";
import { useParams } from "react-router-dom";

const menuItems: MenuItemType[] = [
	{
	  "name": "Masala Dosa",
	  "description": "Crispy rice crepe filled with spiced potatoes, served with sambar and coconut chutney",
	  "price": "$8.50"
	},
	{
	  "name": "Idli Sambar",
	  "description": "Steamed rice cakes served with lentil stew and coconut chutney",
	  "price": "$6.00"
	},
	{
	  "name": "Vada",
	  "description": "Crispy fried lentil donuts served with sambar and chutneys",
	  "price": "$5.50"
	},
	{
	  "name": "Uttapam",
	  "description": "Thick savory pancake with onions, tomatoes, and green chilies",
	  "price": "$7.50"
	},
	{
	  "name": "Rava Dosa",
	  "description": "Crispy semolina crepe served with sambar and chutneys",
	  "price": "$9.00"
	},
	{
	  "name": "Pongal",
	  "description": "Comforting rice and lentil porridge tempered with ghee, cumin, and pepper",
	  "price": "$6.50"
	},
	{
	  "name": "Bisi Bele Bath",
	  "description": "Spicy rice dish cooked with lentils and vegetables",
	  "price": "$10.00"
	},
	{
	  "name": "Medu Vada",
	  "description": "Savory fried lentil doughnuts, crispy outside and soft inside",
	  "price": "$5.00"
	},
	{
	  "name": "Kerala Parotta",
	  "description": "Flaky layered flatbread served with vegetable kurma",
	  "price": "$7.00"
	},
	{
	  "name": "Appam with Stew",
	  "description": "Lacy rice hoppers served with coconut-based vegetable stew",
	  "price": "$9.50"
	}
  ]

const TableOrder = () => {
    const [quantities, setQuantities] = useState<Record<number, number>>(
		menuItems.reduce((acc, _, index) => ({ ...acc, [index]: 0 }), {})
	);

    const size = Object.values(quantities).reduce((sum, value) => sum + value, 0);

    const selectedItems = Object.entries(quantities)
    .filter(([, quantity]) => quantity > 0)  // Removed the underscore
    .map(([index]) => {
        const item = menuItems[Number(index)];
        return {
            name: item.name,
            description: item.description,
            price: item.price,
            quantity: quantities[Number(index)]
        };
    });

    const {tableNumber} = useParams();
    console.log(tableNumber);
	return <>
        <Header size={size} selectedItems={selectedItems}  />
        <Banner />
        <HowWeWork />
        <Menu quantities={quantities} setQuantities={setQuantities} menuItems={menuItems} />
    </>;
};

export default TableOrder;
