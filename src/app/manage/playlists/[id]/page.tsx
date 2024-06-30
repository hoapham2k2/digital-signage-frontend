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
import PlaylistDetailContentComponent from "./components/contents/PlaylistDetailContentManage";

type Props = unknown;

export type PlaylistFormValueTypes = {
	playlist: Playlist;
};

const PlaylistDetailPage = (_props: Props) => {
	const { id: playlistId } = useParams();
	const methods = useForm<PlaylistFormValueTypes>();
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const {
		data: fetchedPlaylist,
		isLoading: isFetchingPlaylist,
		isError: fetchPlaylistError,
		isSuccess: fetchPlaylistSuccess,
	} = useQuery<Playlist>({
		queryKey: ["playlist", playlistId],
		queryFn: () => fetchPlaylistById(playlistId ?? ""),
		enabled: !!playlistId,
		onSuccess: (data: Playlist) => {
			console.log(
				`fetchPlaylistById onSuccess: ${JSON.stringify(data, null, 2)}`
			);
			methods.reset({ playlist: data });
		},
	});


	const { mutate: updatePlaylistMutation } = useMutation(
		async (data: { playlistId: number; playlist: Playlist }) => {
			return updatePlaylist(data.playlistId, data.playlist);
		}
	);

	const onSubmit: SubmitHandler<PlaylistFormValueTypes> = async (
		formData: PlaylistFormValueTypes
	) => {
		try {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			await Promise.all([
				updatePlaylistMutation({
					playlistId: formData.playlist.id,
					// remove unnecessary fields in playlist
					playlist: {
						...formData.playlist,
						//@ts-ignore
						playlistContentItems: formData.playlist.playlistContentItems.map(
							(item) => {
								const { contentItem, ...rest } = item;
								return rest; //remove
							}
						),
					},
				}),
			]);

			alert("Form updated playlist successfully");
			queryClient.invalidateQueries("playlists");
			navigate("/manage/playlists");
		} catch (error) {
			alert(`Error while updating playlist: ${JSON.stringify(error, null, 2)}`);
		}
	};
	if (isFetchingPlaylist) return <div>Loading...</div>;
	if (fetchPlaylistError) return <div>Error...</div>;
	if (!fetchPlaylistSuccess) return <div>Not found</div>;
	if (methods.formState.isSubmitting) return <div>Is submitting...</div>;

	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(onSubmit)}>
				{methods.formState.isSubmitting ? (
					<div className='absolute inset-0 bg-gray-100 bg-opacity-50 flex justify-center items-center'>
						<div className='bg-white p-4 rounded-md border border-gray-300'>
							<div className='flex flex-row gap-4'>
								<h2>Submitting...</h2>
							</div>
						</div>
					</div>
				) : null}

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

					{/* <PlaylistDetailSchedule /> */}

					<PlaylistDetailContentComponent />
				</div>

				{methods.formState.isDirty && (
					<Button type='submit' className='mt-2'>
						Save
					</Button>
				)}
				<DevTool control={methods.control} />
			</form>
		</FormProvider>
	);
};

export default PlaylistDetailPage;
