import { Admins } from "./Admins";

export interface AuthContextType {
    admin: Admins | null,
    isAuthenticated: boolean,
    LOGINADMIN: (admin: Admins) => void;
    LOGOUT: () => void;
}