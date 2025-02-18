import { Menu } from "@/types/Menu";
import { MenuContextType } from "@/types/MenuContextType";
import axios from "axios";

import { createContext, ReactNode, useReducer, useState } from "react";
import toast from "react-hot-toast";

const MenuContext = createContext<MenuContextType | null>(null);

const intialState = {
    menu: [],
};

const reducer = (
    state: {
        menu: Menu[];
    },
    action: { type: string; payload: Menu[] | [] }
) => {
    switch (action.type) {
        case "ADDMENU":
            return {
                ...state,
                menu: [...state.menu, ...action.payload],
            };
        default:
            return state;
    }
}

const MenuContextProvider = ({children}: {children: ReactNode}) => {
    const [{menu}, dispatch] = useReducer(reducer, intialState);
    const [loading, setLoading] = useState(false);

    const ADDMENU = async (menu: Menu[]) => {
        setLoading(true);

        try {
            const response = await axios.post('/api/add-menu', {menu});
            const data = response.data;

            console.log(data);

            dispatch({ type: "ADDMENU", payload: data });

            return true;

        } catch (error) {
            console.log(error);
            toast.error("Either email or password is incorrect");
            return false;
        } finally {
            setLoading(false);
        }

    }

    return (
        <MenuContext.Provider value={{ menu, loading, ADDMENU }}>
            {children}
        </MenuContext.Provider>
    );
}

export { MenuContextProvider, MenuContext };