import { getContentsByScreenAsync } from "@/apis/contents";
import { useToast } from "@/components/ui/use-toast";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import SplashScreen from "@/components/SplashScreen";
export const VirtualScreenDetailPreviewPage: React.FC = () => {
	const { id: screenId } = useParams<{ id: string }>();
	const [currentIndex, setCurrentIndex] = React.useState(0);
	const { toast } = useToast();
	const {
		data: contentItems,
		isLoading,
		isError,
	} = useQuery(
		["contents", screenId],
		() => getContentsByScreenAsync(screenId || ""),
		{
			enabled: !!screenId,
			onError: (error: Error) => {
				toast({
					title: "Error",
					description: error.message,
				});
			},
		}
	);

	useEffect(() => {
		if (!contentItems) return;

		const interval = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % contentItems.length);
		}, 5000);

		return () => clearInterval(interval);
	}, [contentItems]);

	if (isLoading) return <Skeleton className='w-screen h-screen' />;

	if (isError) return <div>Error...</div>;

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
			) : (
				<SplashScreen />
			)}
		</div>
	);
};

export default VirtualScreenDetailPreviewPage;
