//import all file in this folder

export * from "./content";
export * from "./group";
export * from "./playlist";
export * from "./screen";
export * from "./schedule";

export enum ScreenStatus {
	ONLINE,
	OUT_OF_SYNC,
	OFFLINE,
	DISABLED,
}

export enum ScreenType {
	VIRTUAL,
	HARDWARE,
}
