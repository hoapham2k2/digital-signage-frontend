// Schedule
export enum ScheduleType {
	TheDate = "TheDate",
	TheTime = "TheTime",
	TheWeekdays = "TheWeekdays",
}

export enum ScheduleOperatorForDate {
	IsOnOrBefore = "IsOnOrBefore",
	IsExactly = "IsExactly",
	IsOnOrAfter = "IsOnOrAfter",
}

export enum ScheduleOperatorForTime {
	IsBefore = "IsBefore",
	IsBetween = "IsBetween",
	IsAfter = "IsAfter",
}

export enum ScheduleOperatorForWeekdays {
	IsOn = "IsOn",
	IsNotOn = "IsNotOn",
}

export interface DateSchedule {
	id: string;
	playlistId: string;
	type: ScheduleType.TheDate;
	operator: ScheduleOperatorForDate;
	// value: Date;
	value: string;
}

export interface TimeSchedule {
	id: string;
	playlistId: string;
	type: ScheduleType.TheTime;
	operator: ScheduleOperatorForTime;
	// value: Date | [Date, Date];
	value: string;
}

export interface WeekdaysSchedule {
	id: string;
	playlistId: string;
	type: ScheduleType.TheWeekdays;
	operator: ScheduleOperatorForWeekdays;
	value: string;
}

export type Schedule = DateSchedule | TimeSchedule | WeekdaysSchedule;
