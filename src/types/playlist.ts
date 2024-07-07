export type Playlist = {
	id: number;
	title: string;
	isEnabled: boolean;
	duration: number;
	playlistContentItems: {
		playlistId: number;
		contentItemId: number;
		duration: number;
		contentItem: {
			id: number;
			title: string;
			filePath: string;
			duration: number;
			resourceType: string;
		};
	}[];
	playlistLabels: {
		playlistId: number;
		labelId: number;
		label: {
			id: number;
			name: string;
		};
	}[];
};
