import { useFormContext } from "react-hook-form";
import { RegisterFormInputs } from "../RegisterPage";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const PhoneNumberInput = () => {
	const methods = useFormContext<RegisterFormInputs>();

	return (
		<div>
			<Label htmlFor='phoneNumber'>Phone Number</Label>
			<Input {...methods.register("phone")} id='phoneNumber' />
		</div>
	);
};

export default PhoneNumberInput;
