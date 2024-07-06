import { useAuth } from "@/context/AuthContext";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
export const AuthLayout: React.FC = () => {
	const { session } = useAuth();

	const navigate = useNavigate();

	React.useEffect(() => {
		if (session) {
			navigate("/manage/dashboard");
		}
	}, [session, navigate]);
	return (
		<div className='w-screen h-screen p-4 flex flex-row gap-2'>
			<div className='flex-1'>
				<Outlet />
			</div>
			<div className='flex-1'>
				<img
					src='https://i.pinimg.com/originals/5f/8e/c2/5f8ec29435e8f016c1269c8622198478.jpg'
					alt='digital-signage-image'
					className='w-full h-full object-cover rounded-md'
				/>
			</div>
		</div>
	);
};

export default AuthLayout;
