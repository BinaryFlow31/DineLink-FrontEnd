import {
	CreditCard,
	LifeBuoy,
	LogOut,
	Plus,
	Settings,
	User,
	Users,
} from "lucide-react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AvatarCust from "./AvatarCust";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const DropDownCust = () => {
	const {LOGOUT} = useAuth()!;

	const handleLogOut = () => {
		LOGOUT();
		toast.success("Logout Successfully!");
	}
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button><AvatarCust img="https://github.com/shadcn.png" alt="AD" /></button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-52 bg-white' >
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<User />
						<span>Profile</span>
						<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<CreditCard />
						<span>Transactions</span>
						<DropdownMenuShortcut>⌘T</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Settings />
						<span>Settings</span>
						<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator className="bg-gray-500" />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<Users />
						<span>Team</span>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Plus />
						<span><Link to="/chef-form">New Chef</Link></span>
						{/* <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut> */}
					</DropdownMenuItem>
                    <DropdownMenuItem>
						<Plus />
						<span>New Admin</span>
						{/* <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut> */}
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator className="bg-gray-500" />
				<DropdownMenuItem>
					<LifeBuoy />
					<span>Support</span>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<LogOut />
					<span onClick={handleLogOut}>Log out</span>
					<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default DropDownCust;
