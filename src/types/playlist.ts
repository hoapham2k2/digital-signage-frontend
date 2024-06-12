export type Playlist = {
	id: string;
	title: string;
	isEnabled: boolean;
	duration: number;
	playlistContentItems: {
		playlistId: string;
		contentItemId: string;
	}[];

	playlistLabels: {
		playlistId: string;
		labelId: string;
		label: {
			id: number;
			name: string;
		};
	}[];

	schedules: any[];
};
