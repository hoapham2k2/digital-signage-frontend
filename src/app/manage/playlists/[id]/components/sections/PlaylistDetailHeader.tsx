import {
	deletePlaylistAsync,
	deletePlaylistContentItemsAsync,
	deletePlaylistLabelsAsync,
	deletePlaylistUserAsync,
} from "@/apis/playlists";
import HistoryBackButton from "@/components/buttons/HistoryBackButton";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { PlaylistFormValueTypes } from "../../page";
import { useToast } from "@/components/ui/use-toast";

type PlaylistDetailHeaderProps = {
	title: string;
};

export const PlaylistDetailHeader: React.FC<PlaylistDetailHeaderProps> = (
	_props: PlaylistDetailHeaderProps
) => {
	const { id } = useParams<{ id: string }>();
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { toast } = useToast();
	const methods = useFormContext<PlaylistFormValueTypes>();

	const { mutate: deleteCurrentPlaylist } = useMutation(
		async () => {
			await deletePlaylistLabelsAsync(id ?? "");
			await deletePlaylistContentItemsAsync(id ?? "");
			await deletePlaylistUserAsync(id ?? "");
			await deletePlaylistAsync(id ?? "");

			return true;
		},
		{
			onSuccess: () => {
				toast({
					title: "Success",
					description: "Playlist deleted successfully",
				});
				queryClient.invalidateQueries("playlists");
				navigate("/manage/playlists");
			},
			onError: (error: any) => {
				toast({
					title: "Error",
					description: error.message,
				});
			},
		}
	);

	const handleDeletePlaylist = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		e.stopPropagation();
		deleteCurrentPlaylist();
	};

	const isFormDirty = Object.keys(methods.formState.dirtyFields).length > 0;
	return (
		<div className='flex flex-row justify-between items-center'>
			<div className='flex flex-row gap-4 items-center'>
				<HistoryBackButton />
				<h1 className='text-2xl'>{_props.title}</h1>
			</div>
			<div className='flex flex-row gap-2 items-center'>
				{isFormDirty && <Button type='submit'>Update</Button>}
				<Button variant={"destructive"} onClick={handleDeletePlaylist}>
					Delete
				</Button>
			</div>
		</div>
	);
};

export default PlaylistDetailHeader;
