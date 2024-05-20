import ScreenTable from "@/components/table/ScreenTable";
import { Button } from "@/components/ui/button";
import { appStore } from "@/lib/stores/app-store";
import { Screen } from "@/lib/types";

type Props = {};

const ScreensManagementPage = (_props: Props) => {
	const screens: Screen[] = appStore((state) => state.screens);

	return (
		<div className=''>
			<div className='flex flex-row justify-between items-center'>
				<h1 className='text-2xl'>Screens</h1>
				<div className='flex flex-row gap-4'>
					<Button>Edit</Button>
					<Button>New Screen</Button>
				</div>
			</div>
			<ScreenTable screens={screens} />
		</div>
	);
};

export default ScreensManagementPage;
