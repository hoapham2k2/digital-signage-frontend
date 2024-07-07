import { deleteScreen } from "@/apis/screens";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { useToast } from "../ui/use-toast";

export default function ScreenActionRow({ row }: { row: any }) {
	const payment = row.original;
	const { toast } = useToast();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { mutate: deleteScreenMutation } = useMutation(
		() => {
			return deleteScreen(payment.id?.toString() ?? "");
		},
		{
			onSuccess: () => {
				toast({
					title: "Screen Deleted",
					description: "Screen deleted successfully",
				});
				setIsDropdownOpen(false);
				queryClient.invalidateQueries("screens");
			},
			onError: (error: Error) => {
				toast({
					title: "Error while deleting screen",
					description: error.message,
				});
			},
		}
	);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	return (
		<DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' className='h-8 w-8 p-0'>
					<span className='sr-only'>Open menu</span>
					<MoreHorizontal className='h-4 w-4' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuItem
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						navigate(`/manage/screens/${payment.id}/edit`);
					}}>
					Edit
				</DropdownMenuItem>
				<DropdownMenuItem
					className='text-red-500'
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						deleteScreenMutation();
					}}>
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
