import React from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import supabase from "@/configs/supabaseConfig";
import { DropdownMenuItem } from "../ui/dropdown-menu";

export const ButtonLogout: React.FC = () => {
	const { setUser, setSession } = useAuth();
	const navigate = useNavigate();

	const handleLogout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error("Error logging out:", error.message);
		} else {
			setUser(null);
			setSession(null);
			navigate("/login");
		}
	};
	return <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>;
};

export default ButtonLogout;
