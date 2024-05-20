import { create } from "zustand";
import {
	Content,
	Group,
	Playlist,
	Schedule,
	ScheduleOperatorForDate,
	ScheduleOperatorForTime,
	ScheduleType,
	Screen,
} from "../types";

export type AppType = {
	screens: Screen[];
	contents: Content[];
	playlists: Playlist[];
	groups: Group[];
	schedules: Schedule[];
};

export type AppActions = {
	updateScreen: (screen: Screen) => void; // Update screen information
	deleteScreen: (id: string) => void; // Delete screen information

	updateContent: (content: Content) => void; // Update content information
	deleteContent: (id: string) => void; // Delete content information

	updateSchedule: (schedule: Schedule) => void; // Update schedule information
};

export const appStore = create<AppType & AppActions>((set, _get) => ({
	screens: [
		{
			id: "1",
			name: "Screen 1",
			groups: ["1", "2"],
		},
		{
			id: "2",
			name: "Screen 2",
			groups: ["1", "3"],
		},
	],
	contents: [
		{
			id: "1",
			name: "Content 1",
			type: "Image",
			duration: 10,
			playlists: ["1", "2"],
		},
		{
			id: "2",
			name: "Content 2",
			type: "Video",
			duration: 20,
			playlists: ["1"],
		},
	],
	playlists: [
		{
			id: "1",
			name: "Playlist 1",
			groups: ["1", "2"],
			status: "Enabled",
			contents: ["1", "2"],
		},
		{
			id: "2",
			name: "Playlist 2",
			groups: ["1", "3"],
			status: "Disabled",
			contents: ["2"],
		},
	],
	groups: [
		{
			id: "1",
			name: "All Screens",
		},
		{
			id: "2",
			name: "Virtual",
		},
		{
			id: "3",
			name: "Demo",
		},
	],
	schedules: [
		{
			id: "1",
			playlistId: "1",
			scheduleType: ScheduleType.TheDate,
			scheduleOperator: ScheduleOperatorForDate.IsExactly,
			scheduleValue: new Date(),
		},
		{
			id: "2",
			playlistId: "2",
			scheduleType: ScheduleType.TheTime,
			scheduleOperator: ScheduleOperatorForTime.IsBetween,
			scheduleValue: new Date(),
		},
	],
	// for screen actions
	updateScreen: (screen: Screen) => {
		set((state) => ({
			screens: state.screens.map((s) => (s.id === screen.id ? screen : s)),
		}));
	},
	deleteScreen: (id: string) => {
		set((state) => ({
			screens: state.screens.filter((s) => s.id !== id),
		}));
	},

	// for content actions
	updateContent: (content: Content) => {
		set((state) => ({
			contents: state.contents.map((c) => (c.id === content.id ? content : c)),
		}));
	},

	deleteContent: (id: string) => {
		set((state) => ({
			contents: state.contents.filter((c) => c.id !== id),
		}));
	},

	// for schedule actions
	updateSchedule: (schedule: Schedule) => {
		set((state) => ({
			schedules: state.schedules.map((s) =>
				s.id === schedule.id ? schedule : s
			),
		}));
	},
}));
