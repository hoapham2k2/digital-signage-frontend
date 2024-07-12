import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { IoIosAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "../ui/use-toast";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { createVirtualScreen } from "@/apis/screens";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";

const NewDropdownButton = () => {
	const { user } = useAuth();
	const { toast } = useToast();

	const [virtualScreenName, setVirtualScreenName] = React.useState<string>("");
	const dropdownTriggerRef = React.useRef(null);
	const [isDialogOpen, setIsDialogOpen] = React.useState(false);
	const queryClient = useQueryClient();
	const { mutate: createVirtualScreenMutation } = useMutation(
		(virtualScreenName: string) => {
			return createVirtualScreen(virtualScreenName, user?.id as string);
		},
		{
			onSuccess: () => {
				toast({
					title: "Added Virtual Screen",
					description: "Virtual Player added successfully",
				});
				setVirtualScreenName("");
				queryClient.invalidateQueries("screens");
				setIsDialogOpen(false);
			},
			onError(error: Error) {
				toast({
					title: "Error while adding Virtual Screen",
					description: error.message,
				});
			},
		}
	);

	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DropdownMenu>
				<DropdownMenuTrigger
					ref={dropdownTriggerRef}
					className='flex flex-row items-center gap-1'
					asChild>
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
					{/* {dropdownOptions.map((option) => (
					<DropdownMenuItem key={option.name} onClick={option.onClick}>
						{option.name}
					</DropdownMenuItem>
				))} */}
					<DropdownMenuItem>
						<Link to='/manage/screens/new'>Hardware</Link>
					</DropdownMenuItem>
					<DialogTrigger asChild>
						<DropdownMenuItem>Virtual</DropdownMenuItem>
					</DialogTrigger>
					<DropdownMenuItem>
						<Link to='/manage/screens/new'>Playlist</Link>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<DialogContent
				onCloseAutoFocus={(event) => {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					//@ts-expect-error
					dropdownTriggerRef.current?.focus();
					event.preventDefault();
				}}>
				<DialogHeader>
					<DialogTitle>New Virtual Screen</DialogTitle>
				</DialogHeader>
				<Input
					type='text'
					placeholder='Screen Name'
					value={virtualScreenName}
					onChange={(e) => setVirtualScreenName(e.target.value)}
				/>
				<DialogFooter>
					<Button
						onClick={() => {
							createVirtualScreenMutation(virtualScreenName);
						}}>
						Save
					</Button>
					<DialogClose asChild>
						<Button>Cancel</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default NewDropdownButton;
