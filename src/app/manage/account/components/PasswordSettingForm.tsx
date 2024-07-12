import { updatePassword } from "@/apis/account";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

const PasswordSettingForm = () => {
	const { toast } = useToast();
	const navigate = useNavigate();
	const methods = useForm<{
		newPassword: string;
		confirmPassword: string;
	}>({
		defaultValues: {
			newPassword: "",
			confirmPassword: "",
		},
	});

	const { mutate: updatePasswordMutation } = useMutation(
		() => {
			return updatePassword(methods.getValues("newPassword"));
		},
		{
			onSuccess: () => {
				toast({
					title: "Password updated",
					description: "Your password has been updated successfully",
				});
				methods.reset();
				navigate("/manage/account");
			},
			onError: (error: any) => {
				toast({
					title: "Error",
					description: error.message,
				});
			},
		}
	);
	return (
		<div>
			{/* Password Setting Form */}
			<div>
				<h1 className='text-2xl'>Password</h1>
			</div>
			<div>
				<form
					className='flex flex-col gap-4 w-full max-w-lg'
					onSubmit={methods.handleSubmit(async (data) => {
						if (data.newPassword !== data.confirmPassword) {
							toast({
								title: "Error",
								description: "New password and confirm password does not match",
							});
							return;
						}
						// Call the API to update the password
						// await updatePassword(data.currentPassword, data.newPassword);
						updatePasswordMutation();
					})}>
					<div>
						<Label htmlFor='new-password'>New Password</Label>
						<Input
							type='password'
							id='new-password'
							{...methods.register("newPassword")}
						/>
					</div>
					<div>
						<Label htmlFor='confirm-password'>Confirm Password</Label>
						<Input
							type='password'
							id='confirm-password'
							{...methods.register("confirmPassword")}
						/>
					</div>
					<Button>Save</Button>
				</form>
			</div>
		</div>
	);
};

export default PasswordSettingForm;
