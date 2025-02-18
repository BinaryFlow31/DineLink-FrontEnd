import { Admins } from "./Admins";

export interface AuthContextType {
    admin: Admins | null,
    isAuthenticated: boolean,
    isAdmin: boolean,
    LOGINADMIN: (email: string, password: string) => Promise<boolean>;
    LOGOUT: () => void;
    loading: boolean
}