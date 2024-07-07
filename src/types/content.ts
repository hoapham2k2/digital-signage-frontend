// export type Content = {
// 	id?: number;
// 	title: string;
// 	filePath: string;
// 	duration: number;
// 	resourceType: "Image" | "Video" | "Webpage";
// };

export type Content = {
	id?: number;
	title: string;
	file_path: string;
	duration: number;
	resource_type: "Image" | "Video" | "Webpage";
	height: number;
	width: number;
};
