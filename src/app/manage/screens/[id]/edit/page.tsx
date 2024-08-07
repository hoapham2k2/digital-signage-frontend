import HistoryBackButton from "@/components/buttons/HistoryBackButton";
import { useParams } from "react-router-dom";
import DeleteScreenButton from "./components/DeleteScreenButton";
import { useQuery } from "react-query";
import { fetchScreenById } from "@/apis/screens";
import { Player } from "@/types";

const EditScreenDetailPage = () => {
	const { id } = useParams();
	const { data: currentScreen } = useQuery<Player>({
		queryKey: ["screen", id],
		queryFn: () => {
			return fetchScreenById(id as string);
		},
		enabled: !!id,
	});
	return (
		<div>
			{currentScreen && (
				<div>
					<div className='flex flex-row items-center justify-between'>
						<div className='flex flex-row gap-2'>
							<HistoryBackButton />
							<div className='text-2xl'>Edit {currentScreen.name}</div>
						</div>
						<DeleteScreenButton screenId={currentScreen.id?.toString() ?? ""} />
					</div>
					{/* <EditScreenForm screen={currentScreen} /> */}
				</div>
			)}
		</div>
	);
};

export default EditScreenDetailPage;
