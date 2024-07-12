import { useFormContext } from "react-hook-form";
import { ProfileSettingFormProps } from "../ProfileSettingForm";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const GenderSection = () => {
	const methods = useFormContext<ProfileSettingFormProps>();
	const genderOptions: { label: string; value: string }[] = [
		{ label: "Male", value: "male" },
		{ label: "Female", value: "female" },
		{ label: "Other", value: "other" },
	];

	return (
		<div>
			<Label htmlFor='gender'>Gender</Label>
			<RadioGroup
				className='flex flex-row justify-between items-center'
				defaultValue={methods.getValues("user.gender")}
				onValueChange={(newValue: string) => {
					methods.setValue("user.gender", newValue);
				}}>
				{genderOptions.map((option) => (
					<div className='w-full  p-4  flex  flex-row items-center gap-4 rounded-md shadow-md'>
						<RadioGroupItem
							value={option.value}
							key={option.value}
							id={option.value}>
							{option.label}
						</RadioGroupItem>
						<Label htmlFor={option.value}>{option.label}</Label>
					</div>
				))}
			</RadioGroup>
		</div>
	);
};

export default GenderSection;
