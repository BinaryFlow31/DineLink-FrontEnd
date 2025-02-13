interface CategoryNameProps {
    children: React.ReactNode;
    catName: string;
    setCat: (cat: string | null) => void;
    activeCatName: string | null;
  }
const CategoryName: React.FC<CategoryNameProps> = ({children, catName, setCat, activeCatName}) => {
  return (
    <div className={`flex px-1 justify-center min-w-16 items-center gap-1 flex-col text-[#F3274C] rounded-md relative ${activeCatName === catName ? "bg-[#F3274C] text-white border-red-500" : "border-2 border-gray-400"}`} onClick={() => setCat(catName)}>
        {children}
        <p className={`capitalize font-semibold text-sm text-center ${activeCatName === catName ? "text-white" : "text-black"}`}>{catName}</p>
        
    </div>
  )
}

export default CategoryName