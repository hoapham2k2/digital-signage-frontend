import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { useForm } from "@tanstack/react-form";
import { Input } from "@/components/ui/input";
import { UploadContentAsync } from "@/apis/contents";
import { useMutation, useQueryClient } from "react-query";

type NewContentButtonProps = unknown;

export const NewContentButton: React.FC<NewContentButtonProps> = (
	_props: NewContentButtonProps
) => {
	const [isOpen, setIsOpen] = React.useState(false);
	const queryClient = useQueryClient();
	const { mutate: uploadContent } = useMutation(UploadContentAsync, {
		onSuccess: () => {
			console.log("Content uploaded");
			setIsOpen(false);
			queryClient.invalidateQueries("contents");
		},
		onError: (error) => {
			console.error("Error uploading content", error);
		},
	});
	const form = useForm({
		defaultValues: {
			file: undefined,
		},
		onSubmit: async ({ value }) => {
			uploadContent(value.file as unknown as File);
		},
	});
	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button>New Content</Button>
			</DialogTrigger>
			<DialogContent>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}>
					<DialogHeader>
						<DialogTitle>New Content</DialogTitle>
						<DialogDescription>
							<form.Field
								name='file'
								children={(field) => (
									<Input
										type='file'
										name={field.name}
										onBlur={field.handleBlur}
										onChange={(e) =>
											field.handleChange(e.target.files?.[0] as any)
										}
									/>
								)}
							/>
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<DialogClose asChild>
							<Button>Close</Button>
						</DialogClose>
						<Button type='submit'>Finish</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default NewContentButton;
