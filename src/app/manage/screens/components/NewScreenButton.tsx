import { createVirtualScreen } from "@/apis/screens";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { Link } from "react-router-dom";

export const NewScreenButton: React.FC = () => {
	const { user } = useAuth();
	const { toast } = useToast();
	
	const [virtualScreenName, setVirtualScreenName] = React.useState<string>("");
	const dropdownTriggerRef = React.useRef(null);
	const [isDialogOpen, setIsDialogOpen] = React.useState(false);
	const queryClient = useQueryClient();
	const { mutate: createVirtualScreenMutation } = useMutation(
		(virtualScreenName: string) => {
			// API call to create a new virtual screen
			return createVirtualScreen(virtualScreenName, user?.id as string);
		},
		{
			onSuccess: () => {
				toast({
					title: "Added Virtual Screen",
					description: "Virtual Screen added successfully",
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
		<>
			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DropdownMenu>
					<DropdownMenuTrigger asChild ref={dropdownTriggerRef}>
						<Button>New Screen</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>
							<Link to='/manage/screens/new'>Hardware</Link>
						</DropdownMenuItem>

						<DialogTrigger asChild>
							<DropdownMenuItem>Virtual </DropdownMenuItem>
						</DialogTrigger>
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
		</>
	);
};
