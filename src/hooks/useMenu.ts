import { MenuContext } from "@/contexts/MenuContext";
import { useContext } from "react"

const useMenu = () => {
    const context = useContext(MenuContext);

    if(context === undefined) {
        throw new Error("useAuth must be used within an AuthContextProvider");
    }

    return context;
}

export default useMenu;