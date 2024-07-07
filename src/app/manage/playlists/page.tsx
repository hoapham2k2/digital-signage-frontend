import { Button } from "@/components/ui/button";
import PlaylistTable from "./components/PlaylistTable";
import { Link } from "react-router-dom";

const PlaylistsManagementPage = () => {
	return (
		<div className='flex flex-col gap-2'>
			<div className='flex flex-row justify-between items-center'>
				<h1 className='text-2xl'>Playlists</h1>
				<div className='flex flex-row gap-4'>
					<Link to='/manage/playlists/create'>
						<Button>Create Playlist</Button>
					</Link>
				</div>
			</div>
			<PlaylistTable />
		</div>
	);
};

export default PlaylistsManagementPage;
