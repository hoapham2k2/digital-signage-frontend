import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IoMdArrowDropdown } from "react-icons/io";
import { DropdownMenu, DropdownMenuItem } from "../ui/dropdown-menu";
import { DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";

type Props = NonNullable<unknown>;

const AccountSettingButton = (_props: Props) => {
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
				side='bottom'
				sideOffset={5}
				align='end'
				alignOffset={20}>
				<DropdownMenuItem>Settings</DropdownMenuItem>
				<DropdownMenuItem>Log Out</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default AccountSettingButton;
