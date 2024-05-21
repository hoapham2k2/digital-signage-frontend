import HistoryBackButton from "@/components/buttons/HistoryBackButton";
import { useParams } from "react-router-dom";
import DeleteScreenButton from "./components/DeleteScreenButton";
import EditScreenForm from "./components/EditScreenForm";
import { appStore } from "@/lib/stores/app-store";

type Props = NonNullable<unknown>;

const EditScreenDetailPage = (_props: Props) => {
	const { id } = useParams();
	const screen = appStore((state) => state.screens.find((s) => s.id === id));
	return (
		<div>
			<div className='flex flex-row items-center justify-between'>
				<div className='flex flex-row gap-2'>
					<HistoryBackButton />
					<div className='text-2xl'>Edit {screen?.name}</div>
				</div>
				<DeleteScreenButton />
			</div>
			<EditScreenForm screen={screen} />
		</div>
	);
};

export default EditScreenDetailPage;
