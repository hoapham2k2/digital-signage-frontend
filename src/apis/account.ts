import supabase from "@/configs/supabaseConfig";
import { Account } from "@/types";

export const fetchUserWithId = async (id: string): Promise<Account> => {
	const { data, error } = await supabase
		.from("users")
		.select()
		.eq("id", id)
		.single();
	if (error) {
		throw error;
	}
	return data;
};

export const updateUserAccount = async (id: string, account: Account) => {
	const { data, error } = await supabase
		.from("users")
		.update(account)
		.eq("id", id);
	if (error) {
		throw error;
	}
	return data;
};

export const updatePassword = async (newPassword: string) => {
	const { error } = await supabase.auth.updateUser({
		password: newPassword,
	});
	if (error) {
		throw error;
	}
};
