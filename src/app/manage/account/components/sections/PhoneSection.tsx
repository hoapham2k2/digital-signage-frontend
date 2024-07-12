import { useFormContext } from "react-hook-form";
import { ProfileSettingFormProps } from "../ProfileSettingForm";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const PhoneSection = () => {
	const methods = useFormContext<ProfileSettingFormProps>();
	return (
		<div>
			<Label htmlFor='phone'>Phone</Label>
			<Input
				id='phone'
				{...methods.register("user.phone_number")}
				type='tel'
				className='border border-gray-300 rounded-md w-full h-10 px-2'
			/>
		</div>
	);
};

export default PhoneSection;
