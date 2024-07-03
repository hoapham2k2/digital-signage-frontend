import { Analytics, fetchAnalytics } from "@/apis/analytics";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useQuery } from "react-query";
import { MdOutlineScreenshotMonitor } from "react-icons/md";
import { CgPlayList } from "react-icons/cg";
import { VscFileMedia } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
const ScreenStatusItem = ({
	title,
	value,
}: {
	title: string;
	value: string;
}) => {
	return (
		<Card className='flex-1 flex flex-col'>
			<Link
				to={
					title === "number_of_screens"
						? "/manage/screens"
						: title === "number_of_playlists"
						? "/manage/playlists"
						: title === "number_of_content_items"
						? "/manage/assets"
						: ""
				}>
				{title === "number_of_screens" ? (
					<CardHeader className='flex flex-row justify-between items-center gap-1'>
						<MdOutlineScreenshotMonitor className='w-10 h-10' />
						<h1 className=''>{value}</h1>
					</CardHeader>
				) : title === "number_of_playlists" ? (
					<CardHeader className='flex flex-row justify-between items-center gap-1'>
						<CgPlayList className='w-10 h-10' />
						<h1 className=''>{value}</h1>
					</CardHeader>
				) : title === "number_of_content_items" ? (
					<CardHeader className='flex flex-row justify-between items-center gap-1'>
						<VscFileMedia className='w-10 h-10' />
						<h1 className=''>{value}</h1>
					</CardHeader>
				) : null}
				<CardContent>
					<h2 className='text-sm font-normal'>
						{title === "number_of_screens"
							? "Screens"
							: title === "number_of_playlists"
							? "Playlists"
							: title === "number_of_content_items"
							? "Content Items"
							: ""}
					</h2>
				</CardContent>
			</Link>
		</Card>
	);
};

export const ScreenStatus: React.FC = () => {
	const { user } = useAuth();
	const {
		data: analytics,
		isLoading: isFetchingAnalytics,
		isError: fetchAnalyticsError,
	} = useQuery<Analytics>({
		queryKey: "analytics",
		queryFn: () => {
			return fetchAnalytics(user?.id);
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
