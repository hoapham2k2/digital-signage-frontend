export type Player = {
	id: number;
	name: string;
	type: PlayerType;
	location: string;
	ip_address: string;
	virtual_url: string;
	resolution: string;
	orientation: string;
	status: PlayerStatus;
	last_ping: string;
	last_active_date_time: string;
	device_id: string;
};

export type PlayerLabels = {
	player_id: number;
	label_id: number;
};

export type PlayerUsers = {
	player_id: number;
	user_id: string;
};

export type PlayerType = "VIRTUAL" | "HARDWARE";
export type PlayerStatus = "ONLINE" | "OUT_OF_SYNC" | "OFFLINE" | "DISABLED";
