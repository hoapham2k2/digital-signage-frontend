import { useFormContext } from "react-hook-form";
import { ProfileSettingFormProps } from "../ProfileSettingForm";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const AddressSection = () => {
	const methods = useFormContext<ProfileSettingFormProps>();
	return (
		<div>
			<Label htmlFor='address'>Address</Label>
			<Textarea
				id='address'
				placeholder='Enter your address'
				{...methods.register("user.address")}
				defaultValue={methods.getValues("user.address")}
			/>
		</div>
	);
};

export default AddressSection;
