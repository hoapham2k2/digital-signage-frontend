import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute: React.FC = () => {
	const { session } = useAuth();

	return session ? <Outlet /> : <Navigate to='/login' replace />;
};

export default ProtectedRoute;
