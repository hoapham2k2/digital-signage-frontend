import { Analytics, fetchAnalytics } from "@/apis/analytics";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useQuery } from "react-query";
import { MdOutlineScreenshotMonitor } from "react-icons/md";
import { CgPlayList } from "react-icons/cg";
import { VscFileMedia } from "react-icons/vsc";
const ScreenStatusItem = ({
	title,
	value,
}: {
	title: string;
	value: string;
}) => {
	return (
		<Card className='flex-1 flex flex-col'>
			<CardHeader className='flex flex-row justify-between items-center gap-1'>
				{title === "number_of_screens" ? (
					<MdOutlineScreenshotMonitor className='w-10 h-10' />
				) : title === "number_of_playlists" ? (
					<CgPlayList className='w-10 h-10' />
				) : title === "number_of_content_items" ? (
					<VscFileMedia className='w-10 h-10' />
				) : null}

				<h1 className=''>{value}</h1>
			</CardHeader>
			<CardContent>
				{title === "number_of_screens"
					? "Number of Screens"
					: title === "number_of_playlists"
					? "Number of Playlists"
					: title === "number_of_content_items"
					? "Number of Content Items"
					: ""}
			</CardContent>
		</Card>
	);
};

export const ScreenStatus: React.FC = () => {
	const {
		data: analytics,
		isLoading: isFetchingAnalytics,
		isError: fetchAnalyticsError,
	} = useQuery<Analytics>({
		queryKey: "analytics",
		queryFn: fetchAnalytics,

		onSuccess: (data) => {
			console.log(data);
		},
	});

	if (isFetchingAnalytics) {
		return <p>Loading...</p>;
	}

	if (fetchAnalyticsError) {
		return <p>Failed to fetch analytics</p>;
	}

	return (
		<div className='mt-2 flex flex-row justify-between gap-28'>
			<ScreenStatusItem
				title='number_of_screens'
				value={`${analytics?.number_of_screens}`}
			/>
			<ScreenStatusItem
				title='number_of_playlists'
				value={`${analytics?.number_of_playlists}`}
			/>
			<ScreenStatusItem
				title='number_of_content_items'
				value={`${analytics?.number_of_content_items}`}
			/>
		</div>
	);
};

export default ScreenStatus;
