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
			// src={
			// 	`https://jxwvadromebqlpcgmgrs.supabase.co/storage/v1/object/public/${
			// 		content.filePath.includes("default") ? "" : "content"
			// 	}/${content.filePath}` ?? ""
			// }
			contentItems[currentIndex].resourceType === "Image" ? (
				<img
					src={
						`https://jxwvadromebqlpcgmgrs.supabase.co/storage/v1/object/public/${
							contentItems[currentIndex].filePath.includes("default")
								? ""
								: "content"
						}/${contentItems[currentIndex].filePath}` ?? ""
					}
					alt={contentItems[currentIndex].title}
					className='w-full h-full object-cover'
				/>
			) : null}
		</div>
	);
};

export default VirtualScreenDetailPreviewPage;
