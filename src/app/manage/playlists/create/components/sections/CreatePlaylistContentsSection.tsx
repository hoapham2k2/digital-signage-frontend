import ButtonAddContents from "../ButtonAddContents";

export const CreatePlaylistContentsSection = () => {
	return (
		<div className='flex flex-col'>
			<div className='flex flex-row items-center gap-2'>
				<h3>Contents</h3>
				<ButtonAddContents />
			</div>
		</div>
	);
};

export default CreatePlaylistContentsSection;
