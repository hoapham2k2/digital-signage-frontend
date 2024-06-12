import ScreenTable from "@/components/table/ScreenTable";
import { Button } from "@/components/ui/button";

type Props = NonNullable<unknown>;

const ScreensManagementPage = (_props: Props) => {
	return (
		<div className=''>
			<div className='flex flex-row justify-between items-center'>
				<h1 className='text-2xl'>Screens</h1>
				<div className='flex flex-row gap-4'>
					<Button>Edit</Button>
					<Button>New Screen</Button>
				</div>
			</div>
			<ScreenTable />
		</div>
	);
};

export default ScreensManagementPage;
