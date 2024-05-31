import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
	Schedule,
	ScheduleOperatorForDate,
	ScheduleOperatorForTime,
	ScheduleOperatorForWeekdays,
	ScheduleType,
} from "../types";

export type ScheduleStoreType = {
	schedules: Schedule[];
	isSchedulesChanged: boolean;
};

export type ScheduleStoreActions = {
	setSchedules: (schedules: Schedule[]) => void; // Set schedules
	updateSchedule: (schedule: Schedule) => void; // Update schedule information
	addSchedule: (playlistId: string) => void; // Add new schedule
	deleteSchedule: (scheduleId: string) => void; // Delete schedule information
	// updateScheduleType: (
	// 	schedule: Schedule,
	// 	newScheduleType: ScheduleType
	// ) => void; // Update schedule type
	// updateScheduleOperator: (
	// 	schedule: Schedule,
	// 	newScheduleOperator:
	// 		| ScheduleOperatorForDate
	// 		| ScheduleOperatorForTime
	// 		| ScheduleOperatorForWeekdays
	// ) => void; // Update schedule operator
	// updateScheduleDateValue: (schedule: Schedule, newDateValue: Date) => void; // Update schedule date value

	setIsSchedulesChanged: (isSchedulesChanged: boolean) => void; // Set schedules changed
};

export type ScheduleStoreState = ScheduleStoreType & ScheduleStoreActions;

export const useScheduleStore = create<ScheduleStoreState>()(
	devtools((set, _get) => ({
		schedules: [],
		isSchedulesChanged: false,

		// for schedule actions
		setSchedules: (schedules: Schedule[]) => {
			set({ schedules });
		},
		updateSchedule: (schedule: Schedule) => {
			set((state) => ({
				schedules: state.schedules.map((s) =>
					s.id === schedule.id ? schedule : s
				),
			}));
		},
		addSchedule: (playlistId: string) => {
			set((state) => ({
				schedules: [
					...state.schedules,
					{
						id: Math.random().toString(36).substr(2, 9),
						playlistId: playlistId,
						scheduleType: ScheduleType.TheDate,
						scheduleOperator: ScheduleOperatorForDate.IsOnOrBefore,
						scheduleValue: new Date().toISOString(),
					} as Schedule,
				],
			}));
		},
		deleteSchedule: (scheduleId: string) => {
			set((state) => ({
				schedules: state.schedules.filter((s) => s.id !== scheduleId),
			}));
		},

		setIsSchedulesChanged: (isSchedulesChanged: boolean) => {
			set({ isSchedulesChanged });
		},
	}))
);
