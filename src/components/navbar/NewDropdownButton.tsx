import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { IoIosAdd } from "react-icons/io";


const NewDropdownButton = () => {
	const dropdownOptions = [
		{
			name: "Hardware Screen",
			onClick: () => alert("Hardware Screen"),
		},
		{
			name: "Virtual Screen",
			onClick: () => alert("Virtual Screne"),
		},
		{
			name: "Playlist",
			onClick: () => alert("Playlist"),
		},
		{
			name: "Content",
			onClick: () => alert("Content"),
		},
	];
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='flex flex-row items-center gap-1' asChild>
				<Button>
					<IoIosAdd className='w-4 h-4' />
					New
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				side='bottom'
				sideOffset={5}
				align='end'
				alignOffset={0}>
				{dropdownOptions.map((option) => (
					<DropdownMenuItem key={option.name} onClick={option.onClick}>
						{option.name}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default NewDropdownButton;
