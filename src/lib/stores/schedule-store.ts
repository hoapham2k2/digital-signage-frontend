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
};

export type ScheduleStoreActions = {
	updateSchedule: (schedule: Schedule) => void; // Update schedule information
	addSchedule: (schedule: Schedule) => void; // Add new schedule
	deleteSchedule: (scheduleId: string) => void; // Delete schedule information
	updateScheduleType: (
		schedule: Schedule,
		newScheduleType: ScheduleType
	) => void; // Update schedule type
	updateScheduleOperator: (
		schedule: Schedule,
		newScheduleOperator:
			| ScheduleOperatorForDate
			| ScheduleOperatorForTime
			| ScheduleOperatorForWeekdays
	) => void; // Update schedule operator
	updateScheduleDateValue: (schedule: Schedule, newDateValue: Date) => void; // Update schedule date value
};

export type ScheduleStoreState = ScheduleStoreType & ScheduleStoreActions;

export const useScheduleStore = create<ScheduleStoreState>()(
	devtools((set, _get) => ({
		schedules: [],

		// for schedule actions
		updateSchedule: (schedule: Schedule) => {
			set((state) => ({
				schedules: state.schedules.map((s) =>
					s.id === schedule.id ? schedule : s
				),
			}));
		},
		addSchedule: (schedule: Schedule) => {
			set((state) => ({
				schedules:
					state.schedules.length > 0
						? [
								...state.schedules,
								{ ...schedule, id: `${state.schedules.length + 1}` },
						  ]
						: [schedule],
			}));
		},
		deleteSchedule: (scheduleId: string) => {
			set((state) => ({
				schedules: state.schedules.filter((s) => s.id !== scheduleId),
			}));
		},
		updateScheduleType: (schedule: Schedule, newScheduleType: ScheduleType) => {
			set((state) => ({
				schedules: state.schedules.map((s) =>
					s.id === schedule.id
						? {
								...s,
								scheduleType: newScheduleType,
								scheduleOperator:
									newScheduleType === ScheduleType.TheDate
										? ScheduleOperatorForDate.IsExactly
										: newScheduleType === ScheduleType.TheTime
										? ScheduleOperatorForTime.IsBetween
										: ScheduleOperatorForWeekdays.IsOn,
								scheduleValue:
									newScheduleType === ScheduleType.TheDate
										? new Date()
										: newScheduleType === ScheduleType.TheTime
										? [new Date(), new Date()]
										: [""],
						  }
						: s
				),
			}));
		},

		updateScheduleOperator: (
			schedule: Schedule,
			newScheduleOperator:
				| ScheduleOperatorForDate
				| ScheduleOperatorForTime
				| ScheduleOperatorForWeekdays
		) => {
			set((state) => ({
				schedules: state.schedules.map((s) =>
					s.id === schedule.id
						? {
								...s,
								scheduleOperator: newScheduleOperator,
								scheduleValue:
									newScheduleOperator === ScheduleOperatorForTime.IsBetween
										? [new Date(), new Date()]
										: new Date(),
						  }
						: s
				),
			}));
		},

		updateScheduleDateValue: (schedule: Schedule, newDateValue: Date) => {
			set((state) => ({
				schedules: state.schedules.map((s) =>
					s.id === schedule.id ? { ...s, scheduleValue: newDateValue } : s
				),
			}));
		},
	}))
);
