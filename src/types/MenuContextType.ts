import { Menu } from "./Menu";

export interface MenuContextType {
    menu: Menu[],
    loading: boolean,
    ADDMENU: (menu: Menu[]) => Promise<boolean>
}