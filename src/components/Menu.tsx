import MenuCategory from "./MenuCategory"
import MenuItemsCard from "./MenuItemsCard"

const Menu = () => {
  return (
    <div className="flex justify-center items-center gap-6 flex-col w-full py-4 min-h-fit bg-white">
        <p className="text-black font-semibold border-b-4 px-3 border-amber-500 text-2xl rounded-sm">Discover Menu</p>
        <MenuCategory />
        <MenuItemsCard />
    </div>
  )
}

export default Menu