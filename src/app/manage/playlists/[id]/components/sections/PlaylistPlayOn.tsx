import { fetchGroups } from "@/apis/groups";
import { fetchPlaylistById, updatePlaylistLabels } from "@/apis/playlists";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Group, Playlist } from "@/types";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";

type PlaylistPlayOnProps = unknown;

const PlaylistPlayOn: React.FC<PlaylistPlayOnProps> = (
	_props: PlaylistPlayOnProps
) => {
	const { id } = useParams<{ id: string }>();
	const [isOpened, setIsOpened] = useState(false);
	const queryClient = useQueryClient();
	const {
		control,
		handleSubmit,
		reset,
		formState: { isDirty },
	} = useForm<Record<string, boolean>>({});

	const {
		data: fetchedPlaylist,
		isLoading: isFetchingPlaylist,
		isError: fetchPlaylistError,
		isSuccess: fetchPlaylistSuccess,
	} = useQuery<Playlist>({
		queryKey: ["playlist", id],
		queryFn: () => fetchPlaylistById(id as string),
		enabled: !!id,
	});

	const {
		data: fetchedGroups,
		isLoading: isFetchingGroups,
		isError: fetchGroupsError,
		isSuccess: fetchGroupsSuccess,
	} = useQuery<Group[]>({
		queryKey: ["groups"],
		queryFn: () => fetchGroups(),
		enabled: !!fetchedPlaylist,
		onSuccess: (groups: Group[]) => {
			const initialValues: Record<string, boolean> = {};

			fetchedPlaylist &&
				groups.forEach((group) => {
					initialValues[`group-${group.id}`] =
						fetchedPlaylist.playlistLabels.some(
							(label) => label.label.id === group.id
						) || false;
				});

			reset(initialValues);
		},
	});

	const { mutate: updatePlaylistLabelsAsync } = useMutation(
		(data: Record<string, boolean>) => {
			const labelIds = Object.entries(data)
				.filter(([_key, value]) => value)
				.map(([key]) => key.replace("group-", ""));

			return updatePlaylistLabels(
				// parse to number
				parseInt(id as string),
				labelIds.map((id) => parseInt(id))
			);
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries("playlist");
				setIsOpened(false);
			},
		}
	);

	const onSubmit: SubmitHandler<Record<string, boolean>> = (
		data: Record<string, boolean>
	) => {
		console.log("new data", data);
		updatePlaylistLabelsAsync(data);
	};
	const handleFormSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		e.stopPropagation();
		handleSubmit(onSubmit)();
	};

	if (isFetchingPlaylist || isFetchingGroups) return <div>Loading...</div>;
	if (fetchPlaylistError || fetchGroupsError) return <div>Error...</div>;
	if (
		!fetchPlaylistSuccess ||
		!fetchGroupsSuccess ||
		!fetchedPlaylist ||
		!fetchedGroups
	)
		return <div>Not found</div>;

	return (
		<div>
			<h2 className='text-base'>Play Ons</h2>
			<Popover open={isOpened} onOpenChange={setIsOpened}>
				<PopoverTrigger>
					<div className='w-full flex flex-row justify-start items-center'>
						{fetchedPlaylist.playlistLabels.map((label) => (
							<span
								key={label.label.id}
								className='inline-block px-2 py-1 mr-1 bg-gray-200 rounded-md'>
								{label.label.name}
							</span>
						))}
						<span className='text-slate-500 hover:text-slate-700 cursor-pointer'>
							Add a group label
						</span>
					</div>
				</PopoverTrigger>
				<PopoverContent side='bottom' align='start' sideOffset={15}>
					<h1>Group labels</h1>
					<form onSubmit={handleFormSubmit}>
						<div className='max-h-44 overflow-y-auto'>
							{fetchedGroups.map((group) => (
								<Controller
									key={group.id}
									name={`group-${group.id}`}
									control={control}
									render={({ field }) => (
										<div className='flex flex-row items-center space-x-2'>
											<Checkbox
												checked={field.value}
												onCheckedChange={(value) => field.onChange(value)}
											/>
											<span>{group.name}</span>
										</div>
									)}
								/>
							))}

							{isDirty && <Button type='submit'>Save</Button>}
						</div>
					</form>
				</PopoverContent>
			</Popover>
		</div>
	);
};

export default PlaylistPlayOn;
