import { Admins } from "@/types/Admins";
import { AuthContextType } from "@/types/AuthContextType";
import { createContext, ReactNode, useReducer, useState } from "react";
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
    const [loading, setLoading] = useState(false);

    const LOGINADMIN = async (email:string, password:string) => {

        setLoading(true);
        try {
            const response = await axios.post('/api/login', {email, password});

            const data = response.data;

            console.log(data);

            dispatch({ type: "LOGINADMIN", payload: data });

            return true;
        } catch (error) {
            console.log(error);
            toast.error("Either email or password is incorrect");
            return false;
        } finally {
            setLoading(false);
        }
    }

    const LOGOUT = () => {
        dispatch({ type: "LOGOUT", payload: null });
        localStorage.removeItem("logged-user");
        localStorage.removeItem("token");
    }

	return (
		<AuthContext.Provider value={{ admin, isAuthenticated, LOGINADMIN, LOGOUT, loading}}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContextProvider, AuthContext };
