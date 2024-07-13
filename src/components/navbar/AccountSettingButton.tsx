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
import { fetchUserWithId } from "@/apis/account";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

const AccountSettingButton: React.FC = () => {
	const { user } = useAuth();
	const { data: fetchedUser } = useQuery({
		queryKey: ["user", user?.id],
		queryFn: async () => {
			return fetchUserWithId(user?.id);
		},
		enabled: !!user?.id,
	});

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='flex flex-row items-center gap-2'>
				<Avatar>
					<AvatarImage src={fetchedUser?.avatar} />
					<AvatarFallback className='text-gray-800 text-2xl font-semibold'>
						{`${fetchedUser?.first_name?.charAt(
							0
						)}${fetchedUser?.last_name?.charAt(0)}`.toUpperCase() || "A"}
					</AvatarFallback>
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
				<DropdownMenuItem>
					<Link to='/manage/account'>Account Settings</Link>
				</DropdownMenuItem>
				<ButtonLogout />
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default AccountSettingButton;
