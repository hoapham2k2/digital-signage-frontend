import HistoryBackButton from "@/components/buttons/HistoryBackButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { appStore } from "@/lib/stores/app-store";
import EditScreenGroupLabelInput from "../../screens/[id]/edit/components/EditScreenGroupLabelInput";
import PlaylistDetailSchedule from "./components/PlaylistDetailSchedule";
import { useParams } from "react-router-dom";

type Props = NonNullable<unknown>;

const PlaylistDetailPage = (_props: Props) => {
	const { id } = useParams();
	const currentPlaylist = appStore((state) =>
		state.playlists.find((playlist) => playlist.id === id)
	);
	return (
		<div>
			{/* For Header */}
			<div className='flex flex-row justify-between items-center'>
				<div className='flex flex-row gap-4 items-center'>
					<HistoryBackButton />
					<h1 className='text-2xl'>{currentPlaylist?.name}</h1>
				</div>
				<div className='flex flex-row gap-2 justify-self-end'>
					<Button>Delete</Button>
				</div>
			</div>
			{/* For Body */}
			<div className='w-full bg-white p-4 rounded-md border border-gray-300 mt-4'>
				<div className='flex flex-row gap-4'>
					<div className='w-1/2 flex flex-col gap-2'>
						{/* Name section */}
						<div className=''>
							<h2 className='text-base'>Name</h2>
							<Input value={currentPlaylist?.name} />
						</div>
						{/* Enable Section */}
						<div className='flex flex-row items-center justify-between'>
							<h2 className='text-base'>Enabled</h2>
							<Switch defaultChecked={currentPlaylist?.status === "Enabled"} />
						</div>
						{/* Play ons section */}
						<div>
							<h2 className='text-base'>Play Ons</h2>
							<EditScreenGroupLabelInput
								groupLabelNames={
									currentPlaylist?.groups.map((groupId) => {
										const group = appStore((state) =>
											state.groups.find((g) => g.id === groupId)
										);
										return group?.name || "";
									}) || []
								}
							/>
						</div>
						{/* Schedule Section */}
						{/* <div>
							<h2 className='text-base'>Schedule</h2>
							<PlaylistDetailSchedule />
						</div> */}
					</div>
					<div className='w-1/2'>
						{/* Contents Section */}
						<div>
							<h2 className='text-base'>Contents</h2>
							{/* <PlaylistDetailContents /> */}
						</div>
					</div>
				</div>
				<div>
					{/* Schedule Section */}
					<div>
						<h2 className='text-base'>Schedule</h2>
						<PlaylistDetailSchedule />
					</div>
				</div>
			</div>
		</div>
	);
};

export default PlaylistDetailPage;
