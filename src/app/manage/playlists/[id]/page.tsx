import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { Content, Playlist, Schedule } from "@/types/index";
import {
	fetchPlaylistById,
	updatePlaylist,
	updatePlaylistSchedules,
} from "@/apis/playlists";
import { useMutation, useQuery, useQueryClient } from "react-query";
import PlaylistDetailSchedule from "./components/schedules/PlaylistDetailSchedule";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import PlaylistPlayOn from "./components/sections/PlaylistPlayOn";
import { DevTool } from "@hookform/devtools";
import PlaylistDetailHeader from "./components/sections/PlaylistDetailHeader";
import ScheduleDetailEditName from "./components/sections/ScheduleDetailEditName";
import PlaylistDetailEditEnabled from "./components/sections/PlaylistDetailEditEnabled";
import PlaylistDetailContent from "./components/sections/PlaylistDetailContent";
import PlaylistDetailContentComponent from "./components/sections/PlaylistDetailContentManage";

type Props = unknown;

export type PlaylistFormValueTypes = {
	playlist: Playlist;
	contentItems: Content[];
};

const PlaylistDetailPage = (_props: Props) => {
	const { id } = useParams();
	const methods = useForm<PlaylistFormValueTypes>();
	const queryClient = useQueryClient();
	const navigate = useNavigate();
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
			methods.reset({ playlist: data });
		},
	});

	const { mutate: updatePlaylistSchedulesMutation } = useMutation(
		({
			playlistId,
			schedules,
		}: {
			playlistId: number;
			schedules: Schedule[];
		}) => {
			return updatePlaylistSchedules(playlistId, schedules);
		}
	);

	const { mutate: updatePlaylistMutation } = useMutation(
		(data: {
			playlistId: string;
			playlist: Omit<
				Playlist,
				"id" | "playlistContentItems" | "playlistLabels" | "schedules"
			>;
		}) => {
			return updatePlaylist(data.playlistId, data.playlist);
		}
	);

	const onSubmit: SubmitHandler<PlaylistFormValueTypes> = async (
		data: PlaylistFormValueTypes
	) => {
		alert(JSON.stringify(data.playlist));
		try {
			await Promise.all([
				updatePlaylistSchedulesMutation({
					playlistId: Number(data.playlist.id),
					schedules: data.playlist.schedules,
				}),
			]);

			await Promise.all([
				updatePlaylistMutation({
					playlistId: data.playlist.id,
					playlist: {
						title: data.playlist.title,
						isEnabled: data.playlist.isEnabled,
						duration: data.playlist.duration,
					},
				}),
			]);

			await queryClient.invalidateQueries("playlists");
			navigate("/manage/playlists");
		} catch (error) {
			console.error("Error while updating playlist: ", error);
		}
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

					<PlaylistDetailSchedule />

					<PlaylistDetailContentComponent control={methods.control} />
				</div>

				{methods.formState.isDirty && <Button type='submit'>Save</Button>}
				<DevTool control={methods.control} />
			</form>
		</FormProvider>
	);
};

export default PlaylistDetailPage;
