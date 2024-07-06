import { useFormContext } from "react-hook-form";
import { RegisterFormInputs } from "../RegisterPage";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const FirstNameInput = () => {
	const methods = useFormContext<RegisterFormInputs>();

	return (
		<div>
			<Label htmlFor='firstName'>First Name</Label>
			<Input {...methods.register("firstName")} id='firstName' />
		</div>
	);
};

export default FirstNameInput;
