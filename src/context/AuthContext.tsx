// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import supabase from "@/configs/supabaseConfig";
interface AuthContextType {
	session: Session | null;
	user: any;
	setUser: any;
	setSession: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<any> = ({ children }) => {
	const [session, setSession] = useState<Session | null>(null);
	const [user, setUser] = useState<any>(null);

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
			setUser(session?.user);
		});

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
			setUser(session?.user);
		});

		return () => {
			subscription.unsubscribe();
		};
	}, []);

	return (
		<AuthContext.Provider value={{ session, user, setUser, setSession }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
