import { api } from "@/configs/axiosConfig";
import supabase from "@/configs/supabaseConfig";
import { Screen } from "@/types/index";

export const fetchScreens = async (userId: string) => {
	// const { data } = await api.get(`Players?userID=${userId}`);
	// return data;

	// using supabase to join query, which players table and player_users table to get the player details
	const { data, error } = await supabase.rpc("select_players_by_userid", {
		userid: userId,
	});
	if (error) {
		throw error;
	}

	return data;
};

export const fetchScreenById = async (id: string): Promise<Screen> => {
	const { data } = await api.get(`/Players/${id}`);
	return data;
};

export const fetchScreensbyGroupIds = async (
	ids: string[]
): Promise<Screen[]> => {
	const { data: players } = await api.get(`/Players`);

	const filteredScreens = players.filter(
		(screen: Screen) =>
			screen.playerLabels &&
			screen.playerLabels.some((label) =>
				ids.includes(label.labelId.toString())
			)
	);
	return filteredScreens;
};

export const deleteScreen = async (screenId: string) => {
	// const { data } = await api.delete(`/Players/${id}`);
	// return data;

	try {
		//using supabase to delete player, player_user, player_label

		//step 1: delete player_user
		const { error: playerUserError } = await supabase
			.from("player_users")
			.delete()
			.eq("player_id", screenId);
		if (playerUserError) throw playerUserError;

		//step 2: delete player_label
		const { error: playerLabelError } = await supabase
			.from("player_labels")
			.delete()
			.eq("player_id", screenId);
		if (playerLabelError) throw playerLabelError;

		//step 3: delete player
		const { error: playerError } = await supabase
			.from("players")
			.delete()
			.eq("id", screenId);
		if (playerError) throw playerError;

		return;
	} catch (error: any) {
		throw error;
	}
};

export const updateScreen = async (
	id: string,
	updatedScreen: Omit<Screen, "id">
) => {
	const { data } = await api.put(`/Players/${id}`, updatedScreen);
	return data;
};

export const createVirtualScreen = async (name: string, userID: string) => {
	// const { data } = await api.post("/Players/virtual", {
	// 	name,
	// 	userId: userID,
	// });
	// return data;

	try {
		//step 1: create label
		const { data: label, error: labelError } = await supabase
			.from("labels")
			.upsert([{ name: "Virtual" }])
			.select();
		if (labelError) throw labelError;
		const labelId = label[0].id;

		const { data: allScreenLabels, error: allScreenLabelsError } =
			await supabase
				.from("labels")
				.upsert([{ name: "All Screens" }])
				.select();
		if (allScreenLabelsError) throw allScreenLabelsError;
		const allScreenLabelId = allScreenLabels[0].id;

		//step 2: create player
		const { data: player, error: playerError } = await supabase
			.from("players")
			.insert([{ name, type: "VIRTUAL", status: "ONLINE" }])
			.select();
		if (playerError) throw playerError;
		const playerId = player[0].id;

		//step 3: create player_user
		const { error: playerUserError } = await supabase
			.from("player_users")
			.insert([{ player_id: playerId, user_id: userID }])
			.select();
		if (playerUserError) throw playerUserError;

		//step 4: create player_label
		const { error: playerLabelError } = await supabase
			.from("player_labels")
			.insert([{ player_id: playerId, label_id: labelId }])
			.select();
		if (playerLabelError) throw playerLabelError;

		//step 5: create player_label for all screens
		const { error: allScreenPlayerLabelError } = await supabase
			.from("player_labels")
			.insert([{ player_id: playerId, label_id: allScreenLabelId }])
			.select();
		if (allScreenPlayerLabelError) throw allScreenPlayerLabelError;

		return player[0];
	} catch (error: any) {
		throw error;
	}
};

export const createHardwareScreen = async (
	name: string,
	otpCode: string,
	userID: string
) => {
	// const { data } = await api.post("/Players/hardware?otpCode=" + otpCode, {
	// 	name,
	// 	userId: userID,
	// });
	// return data;
	// check "devices" table if column "otp_code" = otpCode;
	try {
		const { data: device, error: deviceError } = await supabase
			.from("devices")
			.select()
			.eq("otp_code", otpCode);
		if (deviceError) throw deviceError;
		if (device.length === 0) {
			throw new Error("Invalid OTP Code");
		}

		// step 1: create label
		const { data: label, error: labelError } = await supabase
			.from("labels")
			.upsert([{ name: "Hardware" }])
			.select();
		if (labelError) throw labelError;
		const labelId = label[0].id;

		const { data: allScreenLabels, error: allScreenLabelsError } =
			await supabase
				.from("labels")
				.upsert([{ name: "All Screens" }])
				.select();
		if (allScreenLabelsError) throw allScreenLabelsError;
		const allScreenLabelId = allScreenLabels[0].id;

		// step 2: create player
		const { data: player, error: playerError } = await supabase
			.from("players")
			.insert([
				{ name, type: "HARDWARE", status: "ONLINE", device_id: device[0].id },
			])
			.select();
		if (playerError) throw playerError;
		const playerId = player[0].id;

		// step 3: create player_user
		const { error: playerUserError } = await supabase
			.from("player_users")
			.insert([{ player_id: playerId, user_id: userID }])
			.select();
		if (playerUserError) throw playerUserError;

		// step 4: create player_label
		const { error: playerLabelError } = await supabase
			.from("player_labels")
			.insert([{ player_id: playerId, label_id: labelId }])
			.select();
		if (playerLabelError) throw playerLabelError;

		// step 5: create player_label for all screens
		const { error: allScreenPlayerLabelError } = await supabase
			.from("player_labels")
			.insert([{ player_id: playerId, label_id: allScreenLabelId }])
			.select();
		if (allScreenPlayerLabelError) throw allScreenPlayerLabelError;

		// // step 6: update device status to "REGISTERED"
		// const { error: deviceUpdateError } = await supabase
		// 	.from("devices")
		// 	.update({ status: "REGISTERED" })
		// 	.eq("otp_code", otpCode);
		// if (deviceUpdateError) throw deviceUpdateError;

		return player[0];
	} catch (error: any) {
		throw error;
	}
};
