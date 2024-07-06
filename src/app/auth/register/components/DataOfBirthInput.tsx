import { Controller, useFormContext } from "react-hook-form";
import { RegisterFormInputs } from "../RegisterPage";
import { Label } from "@/components/ui/label";
import { isAfter } from "date-fns";
import { DatePicker } from "rsuite";
import "rsuite/DatePicker/styles/index.css";
const DateOfBirthInput = () => {
	const methods = useFormContext<RegisterFormInputs>();

	return (
		<Controller
			name='dob'
			control={methods.control}
			render={({ field }) => (
				<div>
					<Label htmlFor='dob'>Date of Birth</Label>
					<DatePicker
						isoWeek
						block
						{...field}
						size='lg'
						shouldDisableDate={(date) => isAfter(date, new Date())}
					/>
				</div>
			)}
		/>
	);
};

export default DateOfBirthInput;
