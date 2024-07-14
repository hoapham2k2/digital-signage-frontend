import { fetchUserWithId, updateUserAccount } from "@/apis/account";
import { useAuth } from "@/context/AuthContext";
import { Account } from "@/types";
import { DevTool } from "@hookform/devtools";
import { FormEvent } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import AvatarSection from "./sections/AvatarSection";
import EmailSection from "./sections/EmailSection";
import PhoneSection from "./sections/PhoneSection";
import { FirstNameSection } from "./sections/FirstNameSection";
import LastNameSection from "./sections/LastNameSection";
import GenderSection from "./sections/GenderSection";
import DobSection from "./sections/DobSection";
import AddressSection from "./sections/AddressSection";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export type ProfileSettingFormProps = {
	user: Account;
};
const ProfileSettingForm = () => {
	const { user } = useAuth();
	const { toast } = useToast();
	const queryClient = useQueryClient();
	const methods = useForm<ProfileSettingFormProps>({
		defaultValues: {
			user: {},
		},
	});
	const { data: fetchedUser } = useQuery({
		queryKey: ["user", user.id],
		queryFn: async () => {
			return fetchUserWithId(user.id);
		},
		onSuccess: (data) => {
			methods.reset({ user: data });
		},
	});

	const { mutate: updateUserAccountMutation } = useMutation(
		() => {
			return updateUserAccount(user.id, methods.getValues("user"));
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["user", user.id]);
				toast({
					title: "Account updated",
					description: "Your account has been updated successfully",
				});
			},
			onError: (error: any) => {
				toast({
					title: "Error",
					description: error.message,
				});
			},
		}
	);

	const onSubmit: SubmitHandler<ProfileSettingFormProps> = async () => {
		updateUserAccountMutation();
	};

	const mySubmit = async (e: FormEvent) => {
		e.preventDefault();

		await methods.handleSubmit(onSubmit)(e);
	};

	return (
		<div className='w-full h-full'>
			{fetchedUser && (
				<FormProvider {...methods}>
					<form onSubmit={mySubmit} className='flex flex-col gap-6'>
						<AvatarSection />
						<div className='w-full flex flex-row gap-2 item-center'>
							<div className='w-1/2 flex flex-col gap-2'>
								<FirstNameSection />
								<EmailSection />
								<GenderSection />
							</div>
							<div className='w-1/2 flex flex-col gap-2'>
								<LastNameSection />
								<PhoneSection />
								<DobSection />
							</div>
						</div>
						<AddressSection />

						{methods.formState.isDirty && <Button type='submit'>Save</Button>}

						<DevTool control={methods.control} placement='top-right' />
					</form>
				</FormProvider>
			)}
		</div>
	);
};

export default ProfileSettingForm;
