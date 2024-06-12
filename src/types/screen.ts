import { ScreenType } from ".";

export type Screen = {
	id?: number;
	name?: string;
	type?: ScreenType;

	lastHeartbeat?: string;
	status?: string;
	playerLabels: {
		labelId: number;
	}[];
};
