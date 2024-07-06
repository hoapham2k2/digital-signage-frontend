import { useFormContext } from "react-hook-form";
import { RegisterFormInputs } from "../RegisterPage";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const LastNameInput = () => {
	const methods = useFormContext<RegisterFormInputs>();

	return (
		<div>
			<Label htmlFor='lastName'>Last Name</Label>
			<Input {...methods.register("lastName")} id='lastName' />
		</div>
	);
};

export default LastNameInput;
