import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useFormContext } from "react-hook-form";
import { LoginFormInputs } from "../LoginPage";

const PasswordInput = () => {
	const methods = useFormContext<LoginFormInputs>();

	return (
		<Controller
			name='password'
			control={methods.control}
			render={({ field }) => (
				<div>
					<Label htmlFor='password'>Password</Label>
					<Input type='password' {...field} />
				</div>
			)}
		/>
	);
};

export default PasswordInput;
