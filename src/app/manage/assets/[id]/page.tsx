import HistoryBackButton from "@/components/buttons/HistoryBackButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { appStore } from "@/lib/stores/app-store";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

type Props = {};

const AssetDetailPage = (props: Props) => {
	const { id } = useParams();
	const [inputValue, setInputValue] = React.useState<string | undefined>("");

	const content = appStore((state) =>
		state.contents.find((content) => content.id === id)
	);
	const updateContent = appStore((state) => state.updateContent);
	const deleteContent = appStore((state) => state.deleteContent);
	const navigate = useNavigate();
	useEffect(() => {
		setInputValue(content?.name);
	}, [content]);

	const handleUpdateContent = () => {
		if (content) {
			updateContent({
				...content,
				name: inputValue || "",
			});
		}
		navigate(`/manage/assets`);
	};

	const handleDeleteContent = () => {
		if (content) {
			deleteContent(content.id);
		}
		navigate(`/manage/assets`);
	};
	8;
	return (
		<div>
			<div className='flex flex-row justify-between items-center'>
				<div className='flex flex-row gap-4 items-center'>
					<HistoryBackButton />
					<h1 className='text-2xl'>Edit {content?.name}</h1>
				</div>
			</div>
			<div className='w-full bg-white p-4 rounded-md border border-gray-300 mt-4'>
				<div className='flex flex-row gap-4'>
					<div className='w-1/2'>
						<h3>Title</h3>
						<Input
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
						/>
					</div>
					<div className='w-1/2'>
						{content?.thumbnail ? (
							<img src={content.thumbnail} alt={content.name} />
						) : (
							<p>No thumbnail</p>
						)}

						<div className='flex flex-row justify-between items-center mt-4'>
							<h3>Default Duration</h3>
							<h3>{content?.duration} sec</h3>
						</div>

						<div className='flex flex-row justify-between items-center mt-4'>
							<h3>Dimension</h3>
							<h3>1920 x 1080</h3>
						</div>

						<div className='flex flex-row justify-between items-center mt-4'>
							<h3>Resource type</h3>
							<h3>{content?.type}</h3>
						</div>

						<div className='flex flex-row justify-end items-center mt-4 gap-2'>
							<Button onClick={handleDeleteContent}>Delete</Button>
							<Button onClick={handleUpdateContent}>Save</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AssetDetailPage;
