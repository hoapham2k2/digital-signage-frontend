import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Group, Screen } from "@/types/index";
import { useState } from "react";
import GroupLabelTable from "./table/GroupLabelTable";
import { useParams } from "react-router-dom";
import { fetchGroupByIds } from "@/apis/groups";
import { useQuery } from "react-query";

type Props = {
	type: "screen" | "playlist";
	groupIds: string[];
};

const EditScreenGroupLabelInput = (props: Props) => {
	const [isShowButton, _setIsShowButton] = useState(false);
	const { id } = useParams<{ id: string }>();

	const { data: currentGroups } = useQuery<Group[]>({
		queryKey: ["groups", props.groupIds],
		queryFn: () => {
			return fetchGroupByIds(props.groupIds);
		},
		enabled: !!props.groupIds,
	});

	return (
		<div
			className=' w-full px-3 py-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 '
			tabIndex={0}>
			<DropdownMenu>
				<DropdownMenuTrigger className='w-full '>
					<div className='w-full flex flex-row justify-start items-center '>
						{currentGroups &&
							currentGroups.map((group) => (
								<span
									key={group.id}
									className='inline-block px-2 py-1 mr-1 bg-gray-200 rounded-md'>
									{group.name}
								</span>
							))}
						<span
							className='text-slate-500 hover:text-slate-700 cursor-pointer
						'>
							Add a group label
						</span>
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					side='bottom'
					align='start'
					sideOffset={15}
					className='max-h-80 overflow-y-auto'>
					<DropdownMenuLabel>Group Labels</DropdownMenuLabel>
					<DropdownMenuSeparator />
					{currentGroups ? (
						<GroupLabelTable type={props.type} id={id as string} />
					) : (
						<p>No group labels</p>
					)}
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
