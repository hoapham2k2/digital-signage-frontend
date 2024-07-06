import { useFormContext } from "react-hook-form";
import { RegisterFormInputs } from "../RegisterPage";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const PasswordInput = () => {
	const methods = useFormContext<RegisterFormInputs>();

	return (
		<div>
			<Label htmlFor='password'>Password</Label>
			<Input {...methods.register("password")} id='password' type='password' />
		</div>
	);
};

export default PasswordInput;
