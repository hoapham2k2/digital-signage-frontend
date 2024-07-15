import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import CreatePlaylistBodySection from "./components/sections/CreatePlaylistBodySection";
import CreatePlaylistHeaderSection from "./components/sections/CreatePlaylistHeaderSection";
import {
	Playlist,
	PlaylistContentItems,
	PlaylistLabels,
	PlaylistUser,
} from "@/types";
import { FormEvent } from "react";
import { useToast } from "@/components/ui/use-toast";
import { DevTool } from "@hookform/devtools";
import { useAuth } from "@/context/AuthContext";
import {
	createPlaylistAsync,
	createPlaylistContentItemsAsync,
	createPlaylistLabelAsync,
	createPlaylistUserAsync,
} from "@/apis/playlists";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

export type CreatePlaylistFormFields = {
	playlist: Playlist;
	playlistUser: PlaylistUser;
	playlistLabels: PlaylistLabels[];
	playlistContentItems: PlaylistContentItems[];
};
export const CreatePlaylistPage = () => {
	const { user } = useAuth();
	const { toast } = useToast();
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const methods = useForm<CreatePlaylistFormFields>({
		defaultValues: {
			playlist: {
				duration: 0,
				title: "",
				id: 0,
				is_enabled: true,
			},
			playlistUser: {
				playlist_id: 0,
				user_id: user?.id || 0,
			},
			playlistLabels: [],
			playlistContentItems: [],
		},
	});

	const { mutate: createPlaylistContentItemsMutation } = useMutation(
		() => createPlaylistContentItemsAsync(methods.watch().playlistContentItems),
		{
			onError: (error: any) => {
				toast({
					title: "Error",
					description: error.message,
				});
			},

			onSuccess: () => {
				toast({
					title: "Success",
					description: "Playlist created successfully",
				});

				queryClient.invalidateQueries("playlists");
				navigate("/manage/playlists");
			},
		}
	);

	const { mutate: createPlaylistLabelMutation } = useMutation(
		() => createPlaylistLabelAsync(methods.watch().playlistLabels),
		{
			onError: (error: any) => {
				toast({
					title: "Error",
					description: error.message,
				});
			},

			onSuccess: (data) => {
				const playlistId = data[0].playlist_id;
				const playlistContentItems = methods.watch().playlistContentItems;
				playlistContentItems.forEach((contentItem) => {
					contentItem.playlist_id = playlistId;
				});
				createPlaylistContentItemsMutation();
			},
		}
	);

	const { mutate: createPlaylistUserMutation } = useMutation(
		() => createPlaylistUserAsync(methods.watch().playlistUser),
		{
			onError: (error: any) => {
				toast({
					title: "Error",
					description: error.message,
				});
			},

			onSuccess: (data) => {
				const playlistid = data[0].playlist_id;
				const playlistLabels = methods.watch().playlistLabels;
				playlistLabels.forEach((label) => {
					label.playlist_id = playlistid;
				});
				createPlaylistLabelMutation();
			},
		}
	);

	const { mutate: createPlaylistMutation } = useMutation(
		() => createPlaylistAsync(methods.watch().playlist),
		{
			onSuccess: (data) => {
				const playlistId = data[0].id;
				const playlistUser = methods.watch().playlistUser;
				playlistUser.playlist_id = playlistId;
				createPlaylistUserMutation();

				// const playlistLabels = methods.watch().playlistLabels;
				// playlistLabels.forEach((label) => {
				// 	label.playlist_id = playlistId;
				// });
				// createPlaylistLabelMutation();

				// const playlistContentItems = methods.watch().playlistContentItems;
				// playlistContentItems.forEach((contentItem) => {
				// 	contentItem.playlist_id = playlistId;
				// });
				// createPlaylistContentItemsMutation();
			},
			onError: (error: any) => {
				toast({
					title: "Error",
					description: error.message,
				});
			},
		}
	);

	const onSubmit: SubmitHandler<CreatePlaylistFormFields> = async () => {
		try {
			createPlaylistMutation();
		} catch (error: any) {
			toast({
				title: "Error",
				description: error.message,
			});
		}
	};

	const mySubmit = async (e: FormEvent) => {
		e.preventDefault();

		await methods.handleSubmit(onSubmit)(e);
	};

	return (
		<FormProvider {...methods}>
			<form onSubmit={mySubmit}>
				<div className='flex flex-col gap-2'>
					<CreatePlaylistHeaderSection />
					<CreatePlaylistBodySection />
				</div>
				<DevTool control={methods.control} />
			</form>
		</FormProvider>
	);
};
export default CreatePlaylistPage;
