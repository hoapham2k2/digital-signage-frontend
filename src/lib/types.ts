export type Group = {
	id: string;
	name: string;
};
export type Screen = {
	id: string;
	thumbnail?: string;
	name: string;
	groups: string[];
	lastHeartbeat?: string;
	status?: string;
};

export type Content = {
	thumbnail?: string;
	id: string;
	name: string;
	type: "Image" | "Video" | "Webpage";
	duration: number;
	playlists?: string[]; // Playlist IDs
};

export type Playlist = {
	id: string;
	name: string;
	groups: string[];
	status: "Enabled" | "Disabled";
	contents: string[];
};

// Schedule
export enum ScheduleType {
	TheDate = "The date",
	TheTime = "The time",
	TheWeekdays = "The weekdays",
}

export enum ScheduleOperatorForDate {
	IsOnOrBefore = "Is on or before",
	IsExactly = "Is exactly",
	IsOnOrAfter = "Is on or after",
}

export enum ScheduleOperatorForTime {
	IsBefore = "Is before",
	IsBetween = "Is between",
	IsAfter = "Is after",
}

export enum ScheduleOperatorForWeekdays {
	IsOn = "Is on",
	IsNotOn = "Is not on",
}

export type Schedule = {
	id: string;
	playlistId: string;
	scheduleType: ScheduleType;
	scheduleOperator:
		| ScheduleOperatorForDate
		| ScheduleOperatorForTime
		| ScheduleOperatorForWeekdays;
	scheduleValue: unknown;
};
