import { useNavigate, useParams } from "react-router-dom";
import { Playlist, PlaylistContentItems, PlaylistLabels } from "@/types/index";
import {
	fetchPlaylistById,
	fetchPlaylistContentItemsByPlaylistAsync,
	fetchPlaylistLabelsByPlaylistAsync,
	updatePlaylistAsync,
	updatePlaylistContentItemsAsync,
	updatePlaylistLabelsAsync,
} from "@/apis/playlists";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import PlaylistPlayOn from "./components/sections/PlaylistPlayOn";
import PlaylistDetailHeader from "./components/sections/PlaylistDetailHeader";
import ScheduleDetailEditName from "./components/sections/ScheduleDetailEditName";
import PlaylistDetailEditEnabled from "./components/sections/PlaylistDetailEditEnabled";
import PlaylistDetailContent from "./components/sections/PlaylistDetailContent";
import PlaylistDetailContentComponent from "./components/contents/PlaylistDetailContentManage";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

export type PlaylistFormValueTypes = {
	playlist: Playlist;
	playlistLabels: PlaylistLabels[];
	playlistContentItems: PlaylistContentItems[];
};

const PlaylistDetailPage = () => {
	const { id: playlistId } = useParams();

	const queryClient = useQueryClient();
	const { toast } = useToast();
	const navigate = useNavigate();

	const {
		data: fetchedPlaylist,
		isLoading: isFetchingPlaylist,
		isError: fetchPlaylistError,
	} = useQuery<Playlist>({
		queryKey: ["playlist", playlistId],
		queryFn: () => fetchPlaylistById(playlistId ?? ""),
		enabled: !!playlistId,
	});

	const {
		data: fetchedPlaylistLabels,
		isLoading: isFetchingPlaylistLabels,
		isError: fetchPlaylistLabelsError,
	} = useQuery<PlaylistLabels[]>({
		queryKey: ["playlist_labels", playlistId],
		queryFn: () => fetchPlaylistLabelsByPlaylistAsync(playlistId ?? ""),
		enabled: !!playlistId,
	});

	const {
		data: fetchedPlaylistContentItems,
		isLoading: isFetchingPlaylistContentItems,
		isError: fetchPlaylistContentItemsError,
	} = useQuery<PlaylistContentItems[]>({
		queryKey: ["playlist_content_items", playlistId],
		queryFn: () => fetchPlaylistContentItemsByPlaylistAsync(playlistId ?? ""),
		enabled: !!playlistId,
	});

	const methods = useForm<PlaylistFormValueTypes>({
		defaultValues: {
			playlist: {},
			playlistLabels: [],
			playlistContentItems: [],
		},
	});

	useEffect(() => {
		if (fetchedPlaylist) {
			methods.setValue("playlist", fetchedPlaylist);
		}
	}, [fetchedPlaylist]);

	useEffect(() => {
		if (fetchedPlaylistLabels) {
			methods.setValue("playlistLabels", fetchedPlaylistLabels);
		}
	}, [fetchedPlaylistLabels]);

	useEffect(() => {
		if (fetchedPlaylistContentItems) {
			methods.setValue("playlistContentItems", fetchedPlaylistContentItems);
		}
	}, [fetchedPlaylistContentItems]);

	const { mutate: updatePlaylistMutation } = useMutation(
		() => updatePlaylistAsync(methods.watch().playlist),
		{
			onError: (error: any) => {
				toast({
					title: "Error while updating playlist",
					description: error.message,
				});
			},
			onSuccess: () => {
				queryClient.invalidateQueries(["playlist", playlistId]);
				updatePlaylistLabelsMutation();
			},
		}
	);

	const { mutate: updatePlaylistContentItemsMutation } = useMutation(
		() => updatePlaylistContentItemsAsync(methods.watch().playlistContentItems),
		{
			onError: (error: any) => {
				toast({
					title: "Error while updating playlist content items",
					description: error.message,
				});
			},
			onSuccess: () => {
				toast({
					title: "Success",
					description: "Playlist updated successfully",
				});
				queryClient.invalidateQueries("playlists");
				navigate("/manage/playlists");
			},
		}
	);

	const { mutate: updatePlaylistLabelsMutation } = useMutation(
		() => updatePlaylistLabelsAsync(methods.watch().playlistLabels),
		{
			onError: (error: any) => {
				toast({
					title: "Error while updating playlist labels",
					description: error.message,
				});
			},
			onSuccess: () => {
				queryClient.invalidateQueries(["playlist", playlistId]);
				updatePlaylistContentItemsMutation();
			},
		}
	);

	const onSubmit: SubmitHandler<PlaylistFormValueTypes> = async () => {
		try {
			updatePlaylistMutation();
		} catch (error: any) {
			toast({
				title: "Error while updating playlist",
				description: error.message,
			});
		}
	};

	if (
		isFetchingPlaylist ||
		isFetchingPlaylistLabels ||
		isFetchingPlaylistContentItems
	) {
		return <div>Loading...</div>;
	}

	if (
		fetchPlaylistError ||
		fetchPlaylistLabelsError ||
		fetchPlaylistContentItemsError
	) {
		return <div>Error while fetching playlist</div>;
	}

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
				<PlaylistDetailHeader title={fetchedPlaylist?.title ?? ""} />
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

					<PlaylistDetailContentComponent />
				</div>
			</form>
		</FormProvider>
	);
};

export default PlaylistDetailPage;
