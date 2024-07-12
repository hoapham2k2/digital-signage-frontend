import { getContentsByPlaylistAsync } from "@/apis/contents";
import SplashScreen from "@/components/SplashScreen";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

export const PlaylistDetailPreview = () => {
	const { id: playlistId } = useParams<{ id: string }>();
	const [currentIndex, setCurrentIndex] = useState(0);
	const [contentItems, setContentItems] = useState<any>(null);
	// const currentItem = contentItems && contentItems[currentIndex];
	const { toast } = useToast();

	const { isLoading, isError } = useQuery(
		["contents", playlistId],
		() => getContentsByPlaylistAsync(playlistId || ""),
		{
			enabled: !!playlistId,
			onError: (error: Error) => {
				toast({
					title: "Error",
					description: error.message,
				});
			},
			onSuccess: (data) => {
				setContentItems(data);
			},
		}
	);

	useEffect(() => {
		if (!contentItems || contentItems?.length === 0) return;
		let interval: NodeJS.Timeout;

		if (contentItems[currentIndex].resource_type === "Image") {
			interval = setInterval(() => {
				setCurrentIndex((prev) => (prev + 1) % contentItems.length);
			}, contentItems[currentIndex].duration * 1000);
		}
		return () => clearInterval(interval);
	}, [contentItems, currentIndex]);

	if (isLoading) return <Skeleton className='w-screen h-screen' />;
	if (isError) return <div>Error...</div>;
	if (contentItems?.length === 0) {
		return <SplashScreen />;
	}
	return (
		<div className='w-screen h-screen'>
			{contentItems &&
			contentItems.length > 0 &&
			contentItems[currentIndex].resource_type === "Image" ? (
				<img
					src={
						`https://jxwvadromebqlpcgmgrs.supabase.co/storage/v1/object/public//${contentItems[currentIndex].file_path}` ??
						""
					}
					alt={contentItems[currentIndex].title}
					className='w-full h-full object-cover'
				/>
			) : contentItems[currentIndex].resource_type === "Video" ? (
				<video
					className='w-full h-full object-cover'
					src={
						`https://jxwvadromebqlpcgmgrs.supabase.co/storage/v1/object/public/${contentItems[currentIndex].file_path}` ??
						""
					}
					autoPlay
					onEnded={() =>
						setCurrentIndex((prev) => (prev + 1) % contentItems.length)
					}
					onError={() =>
						setCurrentIndex((prev) => (prev + 1) % contentItems.length)
					}
					onCanPlay={() =>
						setCurrentIndex((prev) => (prev + 1) % contentItems.length)
					}
					onStalled={() =>
						setCurrentIndex((prev) => (prev + 1) % contentItems.length)
					}
					onAbort={() =>
						setCurrentIndex((prev) => (prev + 1) % contentItems.length)
					}
					onPause={() =>
						setCurrentIndex((prev) => (prev + 1) % contentItems.length)
					}
				/>
			) : (
				<SplashScreen />
			)}
		</div>
	);
};

export default PlaylistDetailPreview;
