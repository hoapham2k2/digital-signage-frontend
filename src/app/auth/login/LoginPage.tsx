import { useToast } from "@/components/ui/use-toast";
import { FormEvent } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import EmailInput from "./components/EmailInput";
import PasswordInput from "./components/PasswordInput";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import supabase from "@/configs/supabaseConfig";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { DevTool } from "@hookform/devtools";

export type LoginFormInputs = {
	email: string;
	password: string;
};

const LoginPage = () => {
	const { toast } = useToast();
	const { setUser, setSession } = useAuth();
	const navigate = useNavigate();

	const methods = useForm<LoginFormInputs>({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit: SubmitHandler<LoginFormInputs> = async (formData) => {
		try {
			const { data, error } = await supabase.auth.signInWithPassword({
				email: formData.email,
				password: formData.password,
			});

			if (error) {
				throw error;
			}

			toast({
				title: "Success",
				description: "Logged in",
			});

			setUser(data?.user);
			setSession(data?.session);
			navigate("/manage/dashboard");
		} catch (error: any) {
			toast({
				title: "Error",
				description: error.message,
			});
		}
	};

	const mySubmit = async (e: FormEvent) => {
		e.preventDefault();

		await methods.handleSubmit(onSubmit)(e);
	};
	return (
		<div className='flex flex-row justify-center items-center px-10'>
			<div className='p-4 w-full flex flex-col gap-2'>
				<h1>Welcome Back!</h1>
				<FormProvider {...methods}>
					<form className='mt-2 flex flex-col gap-2' onSubmit={mySubmit}>
						<EmailInput />
						<PasswordInput />
						<Button type='submit' className='mt-4'>
							Login
						</Button>
						<Button
							className='w-full'
							variant={"outline"}
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								navigate("/register");
							}}>
							Sign Up
						</Button>
						<DevTool control={methods.control} placement='top-right' />
					</form>
				</FormProvider>
				<div>
					<Button className='w-fit p-0 float-right' variant={"link"}>
						Forgot Password?
					</Button>
				</div>
				<div className='w-full flex flex-col gap-2'>
					<Separator>Or</Separator>
					<Button className='w-full' variant={"outline"}>
						Continue with Google
					</Button>
					<Button className='w-full' variant={"outline"}>
						Continue with Facebook
					</Button>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
