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

export type Screen = {
	id: number;
	name: string;
	type: ScreenType; // 0: Player, 1: Virtual
	location: string;
	ipAddress: string;
	virtualUrl: string;
	resolution: string;
	orientation: string;
	status: ScreenStatus; // 0: Online, 1: Out of sync, 2: Offline, 3: Disabled
	lastPing: string;
	lastActiveDateTime: string;
	playerLabels: {
		playerId: number;
		labelId: number;
		label: {
			id: number;
			name: string;
		};
	}[];
	deviceId: string;
	userId: number;
};

// export type Screen = {
// 	id?: number;
// 	name?: string;
// 	type?: ScreenType;
// 	lastPing?: string;
// 	lastHeartbeat?: string;
// 	status?: number;
// 	playerLabels: {
// 		labelId: number;
// 	}[];
// };

// {
// 	"id": 2,
// 	"name": "Player 2",
// 	"type": 0,
// 	"location": null,
// 	"ipAddress": null,
// 	"virtualUrl": null,
// 	"resolution": null,
// 	"orientation": null,
// 	"status": 2,
// 	"lastPing": "2024-06-27 06:20:37.825536+00",
// 	"lastActiveDateTime": "2024-06-27T06:20:37.825536Z",
// 	"playerLabels": [
// 	  {
// 		"playerId": 2,
// 		"labelId": 1,
// 		"label": {
// 		  "id": 1,
// 		  "name": "All Screens"
// 		}
// 	  },
// 	  {
// 		"playerId": 2,
// 		"labelId": 2,
// 		"label": {
// 		  "id": 2,
// 		  "name": "Virtual"
// 		}
// 	  }
// 	],
// 	"deviceId": "default_device_2",
// 	"userId": null
//   }
