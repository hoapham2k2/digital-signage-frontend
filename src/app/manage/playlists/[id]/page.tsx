import HistoryBackButton from "@/components/buttons/HistoryBackButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useNavigate, useParams } from "react-router-dom";
import { Group, Playlist } from "@/lib/types";
import {
	deletePlaylist,
	fetchPlaylistById,
	updatePlaylist,
} from "@/apis/playlists";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useEffect, useState } from "react";
import GroupLabelTable from "../../screens/[id]/edit/components/table/GroupLabelTable";
import { fetchGroupByIds } from "@/apis/groups";
import AppBadge from "@/components/buttons/AppBadge";
import EditScreenGroupLabelInput from "../../screens/[id]/edit/components/EditScreenGroupLabelInput";
import PlaylistDetailSchedule from "./components/PlaylistDetailSchedule";

type Props = NonNullable<unknown>;

const PlaylistDetailPage = (_props: Props) => {
	const { id } = useParams();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null);
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

	const { mutate: updateCurrentPlaylist } = useMutation(
		(playlist: Omit<Playlist, "id">) => updatePlaylist(id as string, playlist),
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

	//use effect to handle isDataChanged when currentPlaylist changes (i.e. when user changes the name or any other field)
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
	}, [currentPlaylist, fetchedPlaylist]);

	const { data: groupsBelongToPlaylist } = useQuery<Group[]>({
		queryKey: ["groups", currentPlaylist?.groups],
		queryFn: () => {
			return fetchGroupByIds(currentPlaylist?.groups as string[]);
		},
		enabled: !!currentPlaylist?.groups,
	});

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
						{/* Schedule Section */}
						<div>
							<h2 className='text-base'>Schedule</h2>
							<PlaylistDetailSchedule />
						</div>
					</div>
					<div className='w-1/2'>
						{/* Contents Section */}
						<div>
							<h2 className='text-base'>Contents</h2>
							{/* <PlaylistDetailContents /> */}
						</div>
					</div>
				</div>
				<div>
					{/* Schedule Section */}
					<div>
						<h2 className='text-base'>Schedule</h2>
						{/* {id && <PlayliswtDetailSchedule playlistId={id} />} */}
					</div>
				</div>
			</div>
			{isDataChanged && <Button onClick={() => {}}>Save</Button>}
		</div>
	);
};

export default PlaylistDetailPage;
