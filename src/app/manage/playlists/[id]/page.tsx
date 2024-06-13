import HistoryBackButton from "@/components/buttons/HistoryBackButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, useParams } from "react-router-dom";
import { Playlist, ScheduleType } from "@/types/index";
import {
	deletePlaylist,
	fetchPlaylistById,
	updatePlaylist,
} from "@/apis/playlists";
import { useMutation, useQuery, useQueryClient } from "react-query";
import PlaylistDetailSchedule from "./components/schedules/PlaylistDetailSchedule";
import {
	Controller,
	FormProvider,
	SubmitHandler,
	useForm,
} from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import PlaylistPlayOn from "./components/sections/PlaylistPlayOn";
import { DevTool } from "@hookform/devtools";
import PlaylistDetailHeader from "./components/sections/PlaylistDetailHeader";
import ScheduleDetailEditName from "./components/sections/ScheduleDetailEditName";
import PlaylistDetailEditEnabled from "./components/sections/PlaylistDetailEditEnabled";
import PlaylistDetailContent from "./components/sections/PlaylistDetailContent";

type Props = unknown;

type PlaylistFormValueTypes = {
	playlist: Playlist;
};

const PlaylistDetailPage = (_props: Props) => {
	const { id } = useParams();
	const methods = useForm<PlaylistFormValueTypes>({});

	const {
		data: fetchedPlaylist,
		isLoading: isFetchingPlaylist,
		isError: fetchPlaylistError,
		isSuccess: fetchPlaylistSuccess,
	} = useQuery<Playlist>({
		queryKey: ["playlist", id],
		queryFn: () => fetchPlaylistById(id as string),
		enabled: !!id,
		onSuccess: (data: Playlist) => {
			console.log("data", data);
			methods.reset({ playlist: data });
		},
	});

	const watchedValues = methods.watch();
	const isChanged =
		JSON.stringify(fetchedPlaylist) !== JSON.stringify(watchedValues);

	const onSubmit: SubmitHandler<PlaylistFormValueTypes> = (
		data: PlaylistFormValueTypes
	) => {
		console.log("new data", data);
		updatePlaylist(id as string, data.playlist);
	};
	if (isFetchingPlaylist) return <div>Loading...</div>;
	if (fetchPlaylistError) return <div>Error...</div>;
	if (!fetchPlaylistSuccess) return <div>Not found</div>;

	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(onSubmit)}>
				{/* For Header */}
				<PlaylistDetailHeader title={fetchedPlaylist.title} />
				{/* For Body */}
				<div className='w-full bg-white p-4 rounded-md border border-gray-300 mt-4'>
					<div className='flex flex-row gap-4'>
						<div className='w-1/2 flex flex-col gap-2'>
							<ScheduleDetailEditName />
							<PlaylistDetailEditEnabled />
							<PlaylistPlayOn />
						</div>
						<div className='w-1/2'>
							<PlaylistDetailContent />
						</div>
					</div>

					<PlaylistDetailSchedule playlistId={id as string} />
				</div>

				{isChanged && <Button type='submit'>Save</Button>}
				<DevTool control={methods.control} />
			</form>

			<pre>{JSON.stringify(watchedValues, null, 2)}</pre>
		</FormProvider>
	);
};

export default PlaylistDetailPage;
