import ScreenTable from "@/components/table/ScreenTable";
import { NewScreenButton } from "./components/NewScreenButton";


const ScreensManagementPage = () => {
	return (
		<div className='flex flex-col gap-2'>
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
