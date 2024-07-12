import { useFormContext } from "react-hook-form";
import { ProfileSettingFormProps } from "../ProfileSettingForm";
import { Label } from "@/components/ui/label";

export const FirstNameSection = () => {
	const methods = useFormContext<ProfileSettingFormProps>();
	return (
		<div>
			<Label htmlFor='first_name'>First Name</Label>
			<input
				id='first_name'
				{...methods.register("user.first_name")}
				type='text'
				className='border border-gray-300 rounded-md w-full h-10 px-2'
			/>
		</div>
	);
};
