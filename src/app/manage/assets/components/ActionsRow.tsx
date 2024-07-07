import { deleteContentAsync } from "@/apis/contents";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Link } from "react-router-dom";

export const ActionsRow: React.FC<any> = ({ row }) => {
	const content = row.original;
	const queryClient = useQueryClient();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { toast } = useToast();
	const { mutate: deleteContent } = useMutation(
		() => deleteContentAsync(content.id?.toString() ?? ""),
		{
			onSuccess: () => {
				toast({
					title: "Content Deleted",
					description: "Content has been deleted successfully",
				});
				queryClient.invalidateQueries("contents");
				setIsMenuOpen(false);
			},
			onError: (error: Error) => {
				toast({
					title: "Error while deleting content",
					description: error.message,
				});
				console.log(error);
			},
		}
	);
	return (
		<DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' className='h-8 w-8 p-0'>
					<span className='sr-only'>Open menu</span>
					<MoreHorizontal className='h-4 w-4' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<Link to={`/manage/assets/${content.id}`}>
					<DropdownMenuItem>Edit</DropdownMenuItem>
				</Link>
				<DropdownMenuItem
					className='text-red-500'
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						deleteContent();
					}}>
					Delete {content.id}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
