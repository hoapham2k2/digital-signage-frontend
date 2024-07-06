import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useFormContext } from "react-hook-form";
import { LoginFormInputs } from "../LoginPage";

const EmailInput = () => {
	const methods = useFormContext<LoginFormInputs>();
	return (
		<Controller
			name='email'
			control={methods.control}
			render={({ field }) => (
				<div>
					<Label htmlFor='email'>Email</Label>
					<Input type='email' {...field} />
				</div>
			)}
		/>
	);
};

export default EmailInput;
