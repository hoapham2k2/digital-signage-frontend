import { fetchGroups } from "@/apis/groups";
import { fetchPlaylistById } from "@/apis/playlists";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Group, Playlist } from "@/types";
import {
	Controller,
	SubmitHandler,
	useFieldArray,
	useForm,
} from "react-hook-form";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

type PlaylistPlayOnProps = unknown;
type FormValues = {
	groups: Group[];
};

const PlaylistPlayOn: React.FC<PlaylistPlayOnProps> = (
	_props: PlaylistPlayOnProps
) => {
	const { id } = useParams<{ id: string }>();

	const { control, handleSubmit, reset, watch } = useForm<FormValues>();

	const { fields, append, remove } = useFieldArray({
		control,
		name: "groups",
	});

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
		onSuccess: (data) => {
			reset({ groups: data });
		},
	});

	const watchedValues = watch();
	const isChanged =
		JSON.stringify(fetchedGroups) !== JSON.stringify(watchedValues);

	const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
		console.log("new data", data);
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
		<DropdownMenu>
			<DropdownMenuTrigger>
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
			</DropdownMenuTrigger>
			<DropdownMenuContent side='bottom' align='start' sideOffset={15}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<DropdownMenuLabel>Group labels</DropdownMenuLabel>
					<div className='max-h-44 overflow-y-auto'>
						{fields.map((field, index) => (
							<div key={field.id}>
								<Controller
									name={`groups.${index}.name`}
									control={control}
									render={({ field }) => <input {...field} />}
								/>
							</div>
						))}
					</div>
				</form>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default PlaylistPlayOn;
