import { deletePlaylist } from "@/apis/playlists";
import HistoryBackButton from "@/components/buttons/HistoryBackButton";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

type PlaylistDetailHeaderProps = {
	title: string;
};

export const PlaylistDetailHeader: React.FC<PlaylistDetailHeaderProps> = (
	_props: PlaylistDetailHeaderProps
) => {
	const { id } = useParams<{ id: string }>();
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { mutate: deleteCurrentPlaylist } = useMutation(
		(playlistId: string) => deletePlaylist(playlistId),
		{
			onSuccess: () => {
				queryClient.invalidateQueries("playlists");
				navigate("/manage/playlists");
			},
		}
	);
	return (
		<div className='flex flex-row justify-between items-center'>
			<div className='flex flex-row gap-4 items-center'>
				<HistoryBackButton />
				<h1 className='text-2xl'>{_props.title}</h1>
			</div>
			<div className='flex flex-row gap-2 justify-self-end'>
				<Button onClick={() => deleteCurrentPlaylist(id as string)}>
					Delete
				</Button>
			</div>
		</div>
	);
};

export default PlaylistDetailHeader;
