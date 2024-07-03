import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IoMdArrowDropdown } from "react-icons/io";
import {
	DropdownMenu,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuLabel,
} from "../ui/dropdown-menu";
import ButtonLogout from "../buttons/ButtonLogout";
import React from "react";
import { useAuth } from "@/context/AuthContext";

const AccountSettingButton: React.FC = () => {
	const { user } = useAuth();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='flex flex-row items-center gap-2'>
				<Avatar>
					<AvatarImage src='https://github.com/shadcn.png' />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<IoMdArrowDropdown />
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className='bg-white shadow-lg rounded-md p-2 z-auto'
				side='bottom'
				sideOffset={5}
				align='end'
				alignOffset={20}>
				<DropdownMenuLabel>
					My Account
					<span className='text-gray-500 text-xs block'>{user?.email}</span>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Settings</DropdownMenuItem>
				<ButtonLogout />
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default AccountSettingButton;
