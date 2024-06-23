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
import React from "react";
import { Link } from "react-router-dom";

export const NewScreenButton: React.FC = () => {
	const dropdownTriggerRef = React.useRef(null);
	return (
		<>
			<Dialog>
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
						//@ts-ignore
						dropdownTriggerRef.current?.focus();
						event.preventDefault();
					}}>
					<DialogHeader>
						<DialogTitle>New Virtual Screen</DialogTitle>
					</DialogHeader>
					<Input type='text' placeholder='Screen Name' />
					<DialogFooter>
						<Button>Save</Button>
						<DialogClose asChild>
							<Button>Cancel</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};
