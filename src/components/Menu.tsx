import { MenuItemType } from "@/types/MenuItemType"
import MenuCategory from "./MenuCategory"
import MenuItemsCard from "./MenuItemsCard"
import React from "react"

const Menu = ({ menuItems, quantities, setQuantities }: { menuItems: MenuItemType[], quantities: Record<number, number>, setQuantities: React.Dispatch<React.SetStateAction<Record<number, number>>>;  }) => {
  return (
    <div className="flex justify-center items-center gap-6 flex-col w-full py-4 min-h-fit bg-white">
        <p className="text-black font-semibold border-b-4 px-3 border-amber-500 text-2xl rounded-sm">Discover Menu</p>
        <MenuCategory />
        <MenuItemsCard menuItems={menuItems} quantities={quantities} setQuantities={setQuantities} />
    </div>
  )
}

export default Menu