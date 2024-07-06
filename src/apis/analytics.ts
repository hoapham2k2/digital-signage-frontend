import { api } from "@/configs/axiosConfig";
import supabase from "@/configs/supabaseConfig";

export type Analytics = {
	// {"number_of_screens": 3, "number_of_playlists": 2, "number_of_content_items": 4}
	number_of_screens: number;
	number_of_playlists: number;
	number_of_content_items: number;
};

export const fetchAnalytics = async (userid: string) => {
	const { data: screens } = await supabase
		.from("player_users")
		.select()
		.eq("user_id", userid);

	const { data: playlists } = await supabase
		.from("playlist_users")
		.select()
		.eq("user_id", userid);

	const { data: contentItems } = await supabase
		.from("content_item_users")
		.select()
		.eq("user_id", userid);

	return {
		number_of_screens: screens?.length,
		number_of_playlists: playlists?.length,
		number_of_content_items: contentItems?.length,
	};
};


