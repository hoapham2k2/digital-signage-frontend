import { getContentsByScreenAsync } from "@/apis/contents";
import React, { useEffect, useRef } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

export const VirtualScreenDetailPreviewPage: React.FC = () => {
	const { id: screenId } = useParams<{ id: string }>();
	const [currentIndex, setCurrentIndex] = React.useState(0);

	const {
		data: contentItems,
		isLoading,
		isError,
	} = useQuery(
		["contents", screenId],
		() => getContentsByScreenAsync(screenId || ""),
		{ enabled: !!screenId }
	);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % contentItems.length);
		}, 5000);

		return () => clearInterval(interval);
	}, [contentItems]);

	if (isLoading) return <div>Loading...</div>;

	if (isError) return <div>Error</div>;

	return (
		<div className='w-screen h-screen'>
			{contentItems.length > 0 &&
			contentItems[currentIndex].resourceType === "Image" ? (
				// https://jxwvadromebqlpcgmgrs.supabase.co/storage/v1/object/public/default/default02.jfif
				<img
					src={`https://jxwvadromebqlpcgmgrs.supabase.co/storage/v1/object/public/${contentItems[currentIndex].filePath} `}
					alt=''
					className='w-full h-full object-none'
				/>
			) : null}
		</div>
	);
};

export default VirtualScreenDetailPreviewPage;
