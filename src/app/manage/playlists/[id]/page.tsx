import HistoryBackButton from "@/components/buttons/HistoryBackButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useNavigate, useParams } from "react-router-dom";
import { Group, Playlist, Schedule } from "@/lib/types";
import {
	deletePlaylist,
	fetchPlaylistById,
	updatePlaylist,
} from "@/apis/playlists";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useEffect, useState } from "react";
import { fetchGroupByIds } from "@/apis/groups";
import EditScreenGroupLabelInput from "../../screens/[id]/edit/components/EditScreenGroupLabelInput";
import PlaylistDetailSchedule from "./components/PlaylistDetailSchedule";
import {
	ScheduleStoreState,
	useScheduleStore,
} from "@/lib/stores/schedule-store";
import {
	fetchSchedulesByPlaylistId,
	updateSchedulesBelongToPlaylist,
} from "@/apis/schedules";
import PlaylistDetailContent from "./components/PlaylistDetailContent";

type Props = NonNullable<unknown>;

const PlaylistDetailPage = (_props: Props) => {
	const { id } = useParams();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null);
	const {
		currentSchedulesBelongToPlaylist,
		setCurrentSchedulesBelongToPlaylist,
	} = useScheduleStore((state: ScheduleStoreState) => ({
		currentSchedulesBelongToPlaylist: state.schedules,
		setCurrentSchedulesBelongToPlaylist: state.setSchedules,
	}));
	const [isDataChanged, setIsDataChanged] = useState(false);

	const { data: fetchedPlaylist } = useQuery<Playlist>({
		queryKey: ["playlist", id],
		queryFn: () => fetchPlaylistById(id as string),
		enabled: !!id,
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

	const {
		mutate: updateCurrentPlaylist,
		isSuccess: updateCurrentPlaylistSuccess,
	} = useMutation(
		(playlist: Omit<Playlist, "id">) => updatePlaylist(id as string, playlist),
		{
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: ["playlist", id],
				});
			},
		}
	);
	const { data: groupsBelongToPlaylist } = useQuery<Group[]>({
		queryKey: ["groups", currentPlaylist?.groups],
		queryFn: () => {
			return fetchGroupByIds(currentPlaylist?.groups as string[]);
		},
		enabled: !!currentPlaylist?.groups,
	});

	// handle for schedules
	const { data: fetchedSchedulesBelongToPlaylist } = useQuery<Schedule[]>({
		queryKey: ["schedules", id],
		queryFn: () => fetchSchedulesByPlaylistId(id as string),
		enabled: !!id,
	});

	const { mutate: updateSchedules, isSuccess: updateSchedulesSuccess } =
		useMutation(
			(playlist: Schedule[]) =>
				updateSchedulesBelongToPlaylist(id as string, playlist),
			{
				onSuccess: () => {
					queryClient.invalidateQueries({
						queryKey: ["playlist", id],
					});
				},
			}
		);

	useEffect(() => {
		if (fetchedPlaylist) {
			setCurrentPlaylist(fetchedPlaylist);
		}
	}, [fetchedPlaylist]);

	useEffect(() => {
		if (fetchedSchedulesBelongToPlaylist) {
			setCurrentSchedulesBelongToPlaylist(fetchedSchedulesBelongToPlaylist);
		}
	}, [fetchedSchedulesBelongToPlaylist]);

	const handleSaveButton = () => {
		if (currentPlaylist) {
			updateCurrentPlaylist(currentPlaylist);
		}
		if (currentSchedulesBelongToPlaylist) {
			updateSchedules(currentSchedulesBelongToPlaylist as Schedule[]);
		}

		if (updateCurrentPlaylistSuccess || updateSchedulesSuccess) {
			setIsDataChanged(false);
		}
	};

	//use effect to handle isDataChanged when currentPlaylist changes (i.e. when user changes the name or any other field) o
	useEffect(() => {
		if (currentPlaylist) {
			if (fetchedPlaylist) {
				const isChanged = Object.keys(currentPlaylist).some(
					(key) =>
						currentPlaylist[key as keyof Playlist] !==
						fetchedPlaylist[key as keyof Playlist]
				);
				setIsDataChanged(isChanged);
			}
		}

		if (currentSchedulesBelongToPlaylist && fetchedSchedulesBelongToPlaylist) {
			// check if the current schedules are changed or not by comparing with fetched schedules from the server (fetchedSchedulesBelongToPlaylist)
			let isChanged = false;
			currentSchedulesBelongToPlaylist.forEach((currentSchedule, index) => {
				if (currentSchedule !== fetchedSchedulesBelongToPlaylist[index]) {
					isChanged = true;
				}
			});
			setIsDataChanged(isChanged);
		}
	}, [
		currentPlaylist,
		currentSchedulesBelongToPlaylist,
		fetchedPlaylist,
		fetchedSchedulesBelongToPlaylist,
	]);

	return (
		<div>
			{/* For Header */}
			<div className='flex flex-row justify-between items-center'>
				<div className='flex flex-row gap-4 items-center'>
					<HistoryBackButton />
					<h1 className='text-2xl'>{fetchedPlaylist?.name}</h1>
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
							{currentPlaylist && (
								<Input
									value={currentPlaylist?.name}
									onChange={(e) => {
										setCurrentPlaylist({
											...currentPlaylist,
											name: e.target.value,
										});
									}}
								/>
							)}
						</div>
						{/* Enable Section */}
						<div className='flex flex-row items-center justify-between'>
							<h2 className='text-base'>Enabled</h2>
							{currentPlaylist && (
								<Switch
									defaultChecked={currentPlaylist?.status === "Enabled"}
									onCheckedChange={(checked) => {
										setCurrentPlaylist({
											...currentPlaylist,
											status: checked ? "Enabled" : "Disabled",
										});
									}}
								/>
							)}
						</div>
						{/* Play ons section */}
						<div>
							<h2 className='text-base'>Play Ons</h2>
							{groupsBelongToPlaylist && (
								<EditScreenGroupLabelInput
									type='playlist'
									groupIds={currentPlaylist?.groups as string[]}
								/>
							)}
						</div>
					</div>
					<div className='w-1/2'>
						{/* Contents Section */}
						<PlaylistDetailContent />
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

			{isDataChanged && <Button onClick={handleSaveButton}>Save</Button>}
		</div>
	);
};

export default PlaylistDetailPage;
