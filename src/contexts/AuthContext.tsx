import { Admins } from "@/types/Admins";
import { AuthContextType } from "@/types/AuthContextType";
import { createContext, ReactNode, useContext, useReducer } from "react";
import toast from "react-hot-toast";
import axios from 'axios';

const AuthContext = createContext<AuthContextType | null>(null);

const intialState = {
	admin: JSON.parse(localStorage.getItem("logged-user") || "{}") || null,
	isAuthenticated: !!JSON.parse(
		localStorage.getItem("logged-user") || "null"
	),
};

const reducer = (
	state: {
		admin: Admins | null;
		isAuthenticated: boolean;
	},
	action: { type: string; payload: Admins | null }
) => {
	switch (action.type) {
		case "LOGINADMIN":
			return {
				...state,
				admin: action.payload,
				isAuthenticated: true,
			};
		case "LOGOUT":
			return {
				...state,
				admin: null,
				isAuthenticated: false,
			};
		default:
			return state;
	}
};

const AuthContextProvider = ({children}: {children: ReactNode}) => {
	const [{admin, isAuthenticated}, dispatch] = useReducer(reducer, intialState);

    const LOGINADMIN = async (admin: Admins) => {
        // Fetch API to authenticate the admin
        try {
            const response = await axios.post('/api/auth/login', admin);

            const data = response.data;

            dispatch({ type: "LOGINADMIN", payload: data });
        } catch (error) {
            console.log(error);
            toast.error("Either email or password is incorrect");
        }
    }

    const LOGOUT = () => {
        dispatch({ type: "LOGOUT", payload: null });
        localStorage.removeItem("logged-user");
        localStorage.removeItem("token");
    }

	return (
		<AuthContext.Provider value={{ admin, isAuthenticated, LOGINADMIN, LOGOUT}}>
			{children}
		</AuthContext.Provider>
	);
};

const useAuth = () => {
    const context = useContext(AuthContext);

    if(context === undefined) {
        throw new Error("useAuth must be used within an AuthContextProvider");
    }

    return context;
}

export { AuthContextProvider, useAuth };
