import React, { useState } from "react";

interface FileInfo {
	title: string;
	type: "image" | "video";
	duration: string;
}

const UploadComponent: React.FC = () => {
	const [filesInfo, setFilesInfo] = useState<FileInfo[]>([]);

	const handleFileChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const files = event.target.files;
		if (!files) return;

		const filesArray = Array.from(files);
		const fileInfoPromises = filesArray.map(async (file) => {
			const title = file.name;
			const type = file.type.startsWith("image") ? "image" : "video";
			let duration = "0:10";

			if (type === "video") {
				duration = await getVideoDuration(file);
			}

			return { title, type, duration };
		});

		const filesInfo = await Promise.all(fileInfoPromises);
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-expect-error
		setFilesInfo(filesInfo);
	};

	const getVideoDuration = (file: File): Promise<string> => {
		return new Promise((resolve) => {
			const video = document.createElement("video");
			video.preload = "metadata";

			video.onloadedmetadata = () => {
				window.URL.revokeObjectURL(video.src);
				const minutes = Math.floor(video.duration / 60);
				const seconds = Math.floor(video.duration % 60);
				resolve(`${minutes}:${seconds.toString().padStart(2, "0")}`);
			};

			video.src = URL.createObjectURL(file);
		});
	};

	return (
		<div>
			<input
				type='file'
				accept='image/*,video/*'
				multiple
				onChange={handleFileChange}
			/>
			{filesInfo.length > 0 && (
				<div>
					{filesInfo.map((fileInfo, index) => (
						<div key={index}>
							<p>Title: {fileInfo.title}</p>
							<p>Type: {fileInfo.type}</p>
							<p>Duration: {fileInfo.duration}</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default UploadComponent;
