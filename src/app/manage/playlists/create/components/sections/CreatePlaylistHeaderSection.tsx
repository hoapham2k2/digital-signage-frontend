import HistoryBackButton from "@/components/buttons/HistoryBackButton";

export const CreatePlaylistHeaderSection = () => {
	return (
		<div className='flex flex-row justify-between items-center'>
			<div className='flex flex-row gap-2 items-center'>
				<HistoryBackButton />
				<h1 className='text-2xl'>New Playlist</h1>
			</div>
		</div>
	);
};

export default CreatePlaylistHeaderSection;
