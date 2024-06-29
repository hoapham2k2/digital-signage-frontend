import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";

interface VideoThumbnailGeneratorProps {
	videoUrl: string;
	classnames?: string[];
}

const VideoThumbnailGenerator: React.FC<VideoThumbnailGeneratorProps> = ({
	videoUrl,
	classnames,
}) => {
	const playerRef = useRef<ReactPlayer | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const [thumbnail, setThumbnail] = useState<string | null>(null);

	const captureThumbnail = () => {
		const player = playerRef.current?.getInternalPlayer() as HTMLVideoElement;
		const canvas = canvasRef.current;
		if (player && canvas) {
			const context = canvas.getContext("2d");

			if (context) {
				// Set the canvas dimensions to match the video
				canvas.width = player.videoWidth;
				canvas.height = player.videoHeight;

				// Draw the current video frame onto the canvas
				context.drawImage(player, 0, 0, canvas.width, canvas.height);

				// Convert the canvas to a data URL
				const thumbnailUrl = canvas.toDataURL("image/png");
				setThumbnail(thumbnailUrl);
			}
		}
	};

	return (
		<div>
			<ReactPlayer
				url={videoUrl}
				ref={playerRef}
				onReady={captureThumbnail}
				config={{
					file: {
						attributes: {
							crossOrigin: "anonymous",
						},
					},
				}}
				style={{ display: "none" }} // Hide the video player
			/>
			<canvas ref={canvasRef} style={{ display: "none" }}></canvas>
			{thumbnail && (
				<img src={thumbnail} alt='Video Thumbnail' className={cn(classnames)} />
			)}
		</div>
	);
};

export default VideoThumbnailGenerator;
