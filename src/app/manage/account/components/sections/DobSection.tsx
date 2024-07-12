import { Controller, useFormContext } from "react-hook-form";
import { DatePicker } from "rsuite";
import "rsuite/DatePicker/styles/index.css";
import { ProfileSettingFormProps } from "../ProfileSettingForm";
import { Label } from "@/components/ui/label";
import { isAfter } from "date-fns";
const DobSection = () => {
	const methods = useFormContext<ProfileSettingFormProps>();
	return (
		<Controller
			name='user.dob'
			control={methods.control}
			render={({ field }) => (
				<div>
					<Label htmlFor='dob'>Date of Birth</Label>
					<DatePicker
						isoWeek
						block
						{...field}
						value={new Date(field.value)}
						size='lg'
						shouldDisableDate={(date) => isAfter(date, new Date())}
					/>
				</div>
			)}
		/>
	);
};

export default DobSection;
