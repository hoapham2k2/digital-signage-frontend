import ScreenTable from "@/components/table/ScreenTable";
import { Button } from "@/components/ui/button";
import { NewScreenButton } from "./components/NewScreenButton";
import { EditScreenButton } from "./components/EditScreenButton";
import { Outlet } from "react-router-dom";

type Props = NonNullable<unknown>;

const ScreensManagementPage = (_props: Props) => {
	return (
		<div className=''>
			<div className='flex flex-row justify-between items-center'>
				<h1 className='text-2xl'>Screens</h1>
				<div className='flex flex-row gap-4'>
					<EditScreenButton />
					<NewScreenButton />
				</div>
			</div>
			<ScreenTable />
			<Outlet />
		</div>
	);
};

export default ScreensManagementPage;
