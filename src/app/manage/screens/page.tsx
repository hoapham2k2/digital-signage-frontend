import ScreenTable from "@/components/table/ScreenTable";
import { NewScreenButton } from "./components/NewScreenButton";

type Props = NonNullable<unknown>;

const ScreensManagementPage = (_props: Props) => {
	return (
		<div className=''>
			<div className='flex flex-row justify-between items-center'>
				<h1 className='text-2xl'>Screens</h1>
				<div className='flex flex-row gap-4'>
					<NewScreenButton />
				</div>
			</div>
			<ScreenTable />
		</div>
	);
};

export default ScreensManagementPage;
