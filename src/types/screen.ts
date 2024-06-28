import { ScreenType } from ".";

export type Screen = {
	id?: number;
	name?: string;
	type?: ScreenType;
	lastPing?: string;
	lastHeartbeat?: string;
	status?: number;
	playerLabels: {
		labelId: number;
	}[];
};
