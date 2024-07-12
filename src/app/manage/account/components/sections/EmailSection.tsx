import { useFormContext } from "react-hook-form";
import { ProfileSettingFormProps } from "../ProfileSettingForm";
import { Label } from "@/components/ui/label";

const EmailSection = () => {
	const methods = useFormContext<ProfileSettingFormProps>();
	return (
		<div>
			<Label htmlFor='email'>Email</Label>
			<input
				id='email'
				{...methods.register("user.email")}
				type='email'
				className='border border-gray-300 rounded-md w-full h-10 px-2'
			/>
		</div>
	);
};

export default EmailSection;
