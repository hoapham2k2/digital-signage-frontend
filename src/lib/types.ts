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
	TheDate = "the date",
	TheTime = "the time",
	TheWeekdays = "the weekdays",
}

export enum ScheduleOperatorForDate {
	IsOnOrBefore = "is on or before",
	IsExactly = "is exactly",
	IsOnOrAfter = "Is on or after",
}

export enum ScheduleOperatorForTime {
	IsBefore = "is before",
	IsBetween = "is between",
	IsAfter = "is after",
}

export enum ScheduleOperatorForWeekdays {
	IsOn = "is on",
	IsNotOn = "is not on",
}

export interface DateSchedule {
	id: string;
	playlistId: string;
	scheduleType: ScheduleType.TheDate;
	scheduleOperator: ScheduleOperatorForDate;
	// scheduleValue: Date;
	scheduleValue: string;
}

export interface TimeSchedule {
	id: string;
	playlistId: string;
	scheduleType: ScheduleType.TheTime;
	scheduleOperator: ScheduleOperatorForTime;
	// scheduleValue: Date | [Date, Date];
	scheduleValue: string | [string, string];
}

export interface WeekdaysSchedule {
	id: string;
	playlistId: string;
	scheduleType: ScheduleType.TheWeekdays;
	scheduleOperator: ScheduleOperatorForWeekdays;
	scheduleValue: string[];
}

export type Schedule = DateSchedule | TimeSchedule | WeekdaysSchedule;
