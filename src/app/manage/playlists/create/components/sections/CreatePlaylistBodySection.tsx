import AddContentToPlaylistButton from "../ButtonAddContents";
import CreatePlaylistFields from "../contents/CreatePlaylistFields";
import ContentsBelongToPlaylist from "../ContentsBelongToPlaylist";

export const CreatePlaylistBodySection = () => {
	return (
		<div className='py-4 bg-white rounded-lg '>
			<div className='flex flex-row gap-10  '>
				<CreatePlaylistFields />
				<div className='w-2/5 min-h-60 flex flex-row items-center justify-center bg-black rounded-md'>
					<p className='text-white text-2xl'>Preview not availabled</p>
				</div>
			</div>
			<div className='flex flex-col gap-2'>
				<div className='flex flex-row gap-2'>
					<h3>Contents</h3>
					<AddContentToPlaylistButton />
				</div>
				<ContentsBelongToPlaylist />
			</div>
		</div>
	);
};

export default CreatePlaylistBodySection;
