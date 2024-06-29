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
import React, { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { UploadContentAsync } from "@/apis/contents";
import { useMutation, useQueryClient } from "react-query";
import { useToast } from "@/components/ui/use-toast";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type NewContentButtonProps = unknown;

export const NewContentButton: React.FC<NewContentButtonProps> = (
	_props: NewContentButtonProps
) => {
	const { toast } = useToast();
	const [isOpen, setIsOpen] = React.useState(false);
	const queryClient = useQueryClient();
	const methods = useForm<{ file: File }>({
		defaultValues: {
			file: undefined,
		},
	});

	const {
		mutate: uploadContent,
		isLoading: isUploadingContentLoading,
		isError: isUploadingContentError,
	} = useMutation(UploadContentAsync, {
		onSuccess: () => {
			methods.reset();
			setIsOpen(false);
			queryClient.invalidateQueries("contents");
		},
		onError: (error) => {
			methods.reset();
			toast({
				title: "Error",
				description: error as string,
			});
		},
	});

	const handleSubmit = (cb: SubmitHandler<{ file: File }>) => {
		return methods.handleSubmit(cb);
	};
	const mySubmit = async (e: FormEvent) => {
		e.preventDefault();

		await handleSubmit(() => {
			const data = methods.getValues();
			console.log(data.file);
			if (!data.file) return;
			uploadContent(data.file);
		})(e);
	};
	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button>New Content</Button>
			</DialogTrigger>
			<DialogContent>
				{isUploadingContentLoading ? (
					<p>Uploading content...</p>
				) : isUploadingContentError ? (
					<p>Error uploading content</p>
				) : (
					<form className='flex flex-col gap-2' onSubmit={mySubmit}>
						<DialogHeader>
							<DialogTitle>New Content</DialogTitle>
						</DialogHeader>
						<Controller
							control={methods.control}
							name='file'
							render={({ field }) => (
								<Input
									type='file'
									multiple={false}
									onChange={(e: any) => {
										field.onChange(e.target.files[0]);
									}}
								/>
							)}
						/>
						<DialogFooter>
							<DialogClose asChild>
								<Button>Close</Button>
							</DialogClose>
							<Button type='submit'>Finish</Button>
						</DialogFooter>
					</form>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default NewContentButton;
