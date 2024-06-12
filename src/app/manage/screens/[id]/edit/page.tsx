import HistoryBackButton from "@/components/buttons/HistoryBackButton";
import { useParams } from "react-router-dom";
import DeleteScreenButton from "./components/DeleteScreenButton";
import EditScreenForm from "./components/EditScreenForm";
import { useQuery } from "react-query";
import { fetchScreenById } from "@/apis/screens";
import { Screen } from "@/types/index";

type Props = NonNullable<unknown>;

const EditScreenDetailPage = (_props: Props) => {
	const { id } = useParams();
	const { data: currentScreen } = useQuery<Screen>({
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
						<DeleteScreenButton screenId={currentScreen.id} />
					</div>
					<EditScreenForm screen={currentScreen} />
				</div>
			)}
		</div>
	);
};

export default EditScreenDetailPage;
