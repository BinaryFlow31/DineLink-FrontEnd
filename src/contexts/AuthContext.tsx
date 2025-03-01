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
	isAdmin: JSON.parse(localStorage.getItem("logged-user") || 'null')?.role === "ADMIN",
};

const reducer = (
	state: {
		admin: Admins | null;
		isAuthenticated: boolean;
		isAdmin: boolean;
	},
	action: { type: string; payload: Admins | null }
) => {
	switch (action.type) {
		case "LOGINADMIN":
			return {
				...state,
				admin: action.payload,
				isAuthenticated: true,
				isAdmin: true
			};
		case "LOGINCHEF":
			return {
				...state,
				admin: action.payload,
				isAuthenticated: true,
				isAdmin: false
			};
		case "LOGOUT":
			return {
				...state,
				admin: null,
				isAuthenticated: false,
				isAdmin: false
			};
		default:
			return state;
	}
};

const AuthContextProvider = ({children}: {children: ReactNode}) => {
	const [{admin, isAuthenticated, isAdmin}, dispatch] = useReducer(reducer, intialState);
    const [loading, setLoading] = useState(false);

    const LOGINADMIN = async (email:string, password:string) => {

        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8080/api/v1/auth/login', {email, password});

            const data = response.data;

			console.log(data);

			if(data) {
				localStorage.setItem("logged-user", JSON.stringify(data));
                localStorage.setItem("token", btoa(`${email}:${password}`));

				if(data.role === "ADMIN") {
					dispatch({ type: "LOGINADMIN", payload: data });
				} else {
					dispatch({ type: "LOGINCHEF", payload: data });
				}
				
                return true;
			}
			return false;
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
		<AuthContext.Provider value={{ admin, isAuthenticated, isAdmin, LOGINADMIN, LOGOUT, loading}}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContextProvider, AuthContext };
