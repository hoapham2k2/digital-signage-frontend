import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute: React.FC = () => {
	const { user } = useAuth();

	return user ? <Outlet /> : <Navigate to='/login' replace />;
};

export default ProtectedRoute;
