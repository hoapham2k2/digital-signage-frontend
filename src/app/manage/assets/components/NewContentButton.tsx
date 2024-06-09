import { Button } from "@/components/ui/button";
import {
	Dialog,
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
import { uploadContent } from "@/apis/contents";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

type NewContentButtonProps = unknown;

export const NewContentButton: React.FC<NewContentButtonProps> = (
	_props: NewContentButtonProps
) => {
	const form = useForm({
		defaultValues: {
			file: undefined,
		},
		onSubmit: async ({ value }) => {
			const response = await axios.post(
				"http://localhost:5036/api/v1/ContentItems",
				value,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);

			if (response.status === 200) {
				alert("Content uploaded successfully");
			}

			console.log(response);
		},
	});
	return (
		<Dialog>
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
						<Button>Close</Button>
						<Button type='submit'>Finish</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default NewContentButton;
