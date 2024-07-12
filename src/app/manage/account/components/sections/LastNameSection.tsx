import { useFormContext } from "react-hook-form";
import { ProfileSettingFormProps } from "../ProfileSettingForm";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const LastNameSection = () => {
	const methods = useFormContext<ProfileSettingFormProps>();
	return (
		<div>
			<Label htmlFor='last_name'>Last Name</Label>
			<Input
				id='last_name'
				{...methods.register("user.last_name")}
				type='text'
				className='border border-gray-300 rounded-md w-full h-10 px-2'
			/>
		</div>
	);
};

export default LastNameSection;
