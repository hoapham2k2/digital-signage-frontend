import GroupTable from "@/components/table/GroupTable";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

type Props = {
	groupLabelNames: string[];
};

const EditScreenGroupLabelInput = (props: Props) => {
	const [isShowButton, setIsShowButton] = useState(false);
	return (
		<div
			className=' w-full px-3 py-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 '
			tabIndex={0}>
			<DropdownMenu>
				<DropdownMenuTrigger className='w-full '>
					<div className='w-full flex flex-row justify-start items-center '>
						{props.groupLabelNames.map((name) => (
							<span
								key={name}
								className='inline-block px-2 py-1 mr-1 bg-gray-200 rounded-md'>
								{name}
							</span>
						))}
						<span
							className='text-slate-500 hover:text-slate-700 cursor-pointer
						'>
							Add a group label
						</span>
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent side='bottom'>
					<DropdownMenuLabel>Group Labels</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<GroupTable setIsShowButton={setIsShowButton} />
					{isShowButton && (
						<DropdownMenuItem asChild>
							<Button className='w-full mt-2'>Save</Button>
						</DropdownMenuItem>
					)}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default EditScreenGroupLabelInput;
