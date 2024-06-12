export type Content = {
	id?: number;
	title: string;
	filePath: string;
	duration: number;
	resourceType: "Image" | "Video" | "Webpage";
};
