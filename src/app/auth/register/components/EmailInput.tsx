import { Controller, useFormContext } from "react-hook-form";
import { RegisterFormInputs } from "../RegisterPage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const EmailInput = () => {
	const methods = useFormContext<RegisterFormInputs>();

	return (
		<Controller
			name='email'
			control={methods.control}
			render={({ field }) => (
				<div>
					<Label htmlFor='email'>Email</Label>
					<Input {...field} id='email' />
				</div>
			)}
		/>
	);
};

export default EmailInput;
