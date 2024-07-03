import supabase from "@/configs/supabaseConfig";
import { useAuth } from "@/context/AuthContext";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
export const LoginPage: React.FC = () => {
	const { session } = useAuth();

	const navigate = useNavigate();

	React.useEffect(() => {
		if (session) {
			navigate("/manage/dashboard");
		}
	}, [session, navigate]);
	return (
		<div className='w-screen h-screen flex justify-center items-center'>
			<div className='w-full max-w-lg'>
				<Auth
					supabaseClient={supabase}
					appearance={{ theme: ThemeSupa }}
					providers={["github"]}
				/>
			</div>
		</div>
	);
};

export default LoginPage;
