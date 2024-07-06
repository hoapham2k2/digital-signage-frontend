import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FormEvent } from "react";
import { useToast } from "@/components/ui/use-toast";
import { DevTool } from "@hookform/devtools";
import FirstNameInput from "./components/FirstNameInput";
import LastNameInput from "./components/LastNameInput";
import PhoneNumberInput from "./components/PhoneNumberInput";
import DateOfBirthInput from "./components/DataOfBirthInput";
import EmailInput from "./components/EmailInput";
import PasswordInput from "./components/PasswordInput";
import supabase from "@/configs/supabaseConfig";
import { useAuth } from "@/context/AuthContext";
export type RegisterFormInputs = {
	email: string;
	password: string;
	//meta data
	firstName: string;
	lastName: string;
	phone: string;
	dob: Date;
};
const RegisterPage = () => {
	const { setUser, setSession } = useAuth();
	const methods = useForm<RegisterFormInputs>({});
	const { toast } = useToast();
	const navigate = useNavigate();
	const onSubmit: SubmitHandler<RegisterFormInputs> = async (formData) => {
		try {
			const { data, error } = await supabase.auth.signUp({
				email: formData.email,
				password: formData.password,
			});

			if (error) {
				throw error;
			}

			const user = data?.user;

			if (!user) {
				throw new Error("User not found");
			}

			const { error: profileError } = await supabase.from("users").insert([
				{
					id: user.id,
					email: user.email,
					first_name: formData.firstName,
					last_name: formData.lastName,
					phone_number: formData.phone,
					dob: formData.dob,
				},
			]);

			if (profileError) {
				throw profileError;
			}

			setUser(user);
			setSession(data?.session);

			toast({
				title: "Success",
				description: "Registered",
			});

			navigate("/manage/dashboard");
		} catch (error: any) {
			toast({
				title: "Error",
				description: error.message,
			});
			return;
		}
	};

	const mySubmit = async (e: FormEvent) => {
		e.preventDefault();

		await methods.handleSubmit(onSubmit)(e);
	};

	return (
		<div className='flex flex-col gap-2'>
			<FormProvider {...methods}>
				<form onSubmit={mySubmit}>
					<div className='flex flex-row justify-between items-center'>
						<h1>Register</h1>
						<Button variant={"link"}>
							<Link to='/login' className='flex flex-row items-center'>
								Back to Login
								<MdKeyboardArrowRight className='w-6 h-6' />
							</Link>
						</Button>
					</div>
					<div className='mt-4 flex flex-col gap-2'>
						<FirstNameInput />
						<LastNameInput />
						<PhoneNumberInput />
						<DateOfBirthInput />
						<EmailInput />
						<PasswordInput />
					</div>
					<DevTool control={methods.control} />
					{methods.formState.isDirty && (
						<Button type='submit' className='mt-4 float-right'>
							Register
						</Button>
					)}
				</form>
			</FormProvider>
		</div>
	);
};

export default RegisterPage;
