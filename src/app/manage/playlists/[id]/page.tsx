import HistoryBackButton from "@/components/buttons/HistoryBackButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, useParams } from "react-router-dom";
import { Playlist } from "@/types/index";
import {
	deletePlaylist,
	fetchPlaylistById,
	updatePlaylist,
} from "@/apis/playlists";
import { useMutation, useQuery, useQueryClient } from "react-query";
import PlaylistDetailSchedule from "./components/PlaylistDetailSchedule";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import PlaylistPlayOn from "./components/PlaylistPlayOn";

type Props = unknown;

const PlaylistDetailPage = (_props: Props) => {
	const { id } = useParams();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { control, handleSubmit, reset, watch } = useForm<Playlist>();

	const {
		data: fetchedPlaylist,
		isLoading: isFetchingPlaylist,
		isError: fetchPlaylistError,
		isSuccess: fetchPlaylistSuccess,
	} = useQuery<Playlist>({
		queryKey: ["playlist", id],
		queryFn: () => fetchPlaylistById(id as string),
		enabled: !!id,
		onSuccess: (data) => {
			reset(data);
		},
	});

	const { mutate: deleteCurrentPlaylist } = useMutation(
		(playlistId: string) => deletePlaylist(playlistId),
		{
			onSuccess: () => {
				queryClient.invalidateQueries("playlists");
				navigate("/manage/playlists");
			},
		}
	);
	const watchedValues = watch();

	const isChanged =
		JSON.stringify(fetchedPlaylist) !== JSON.stringify(watchedValues);

	const onSubmit: SubmitHandler<Playlist> = (data: Playlist) => {
		console.log("new data", data);
		updatePlaylist(id as string, data);
	};

	if (isFetchingPlaylist) return <div>Loading...</div>;
	if (fetchPlaylistError) return <div>Error...</div>;
	if (!fetchPlaylistSuccess) return <div>Not found</div>;

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{/* For Header */}
			<div className='flex flex-row justify-between items-center'>
				<div className='flex flex-row gap-4 items-center'>
					<HistoryBackButton />
					<h1 className='text-2xl'>{fetchedPlaylist.title}</h1>
				</div>
				<div className='flex flex-row gap-2 justify-self-end'>
					<Button onClick={() => deleteCurrentPlaylist(id as string)}>
						Delete
					</Button>
				</div>
			</div>
			{/* For Body */}
			<div className='w-full bg-white p-4 rounded-md border border-gray-300 mt-4'>
				<div className='flex flex-row gap-4'>
					<div className='w-1/2 flex flex-col gap-2'>
						{/* Name section */}
						<div className=''>
							<h2 className='text-base'>Name</h2>
							<Controller
								control={control}
								name={"title"}
								render={({ field }) => <Input {...field} />}
							/>
						</div>
						{/* Enable Section */}
						<div className='flex flex-row items-center justify-between'>
							<h2 className='text-base'>Enabled</h2>

							<Controller
								control={control}
								name='isEnabled'
								render={({ field }) => (
									<Switch
										checked={field.value}
										onCheckedChange={(newvalue) => field.onChange(newvalue)}
									/>
								)}
							/>
						</div>
						{/* Play ons section */}
						<div>
							<h2 className='text-base'>Play Ons</h2>
							<PlaylistPlayOn />
						</div>
					</div>
					<div className='w-1/2'>
						{/* Contents Section */}
						{/* <PlaylistPlayOn /> */}
					</div>
				</div>
				<div>
					{/* Schedule Section */}
					<div>
						<h2 className='text-base'>Schedule</h2>
						<PlaylistDetailSchedule playlistId={id as string} />
					</div>
				</div>
			</div>

			{isChanged && <Button type='submit'>Save</Button>}
		</form>
	);
};

export default PlaylistDetailPage;
