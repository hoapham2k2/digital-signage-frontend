import { Button } from "@/components/ui/button";
import ContentTable from "./components/ContentTable";

type Props = NonNullable<unknown>;

const ContentsManagementPage = (_props: Props) => {
	return (
		<div>
			<div className='flex flex-row justify-between items-center'>
				<h1 className='text-2xl'>Screens</h1>
				<div className='flex flex-row gap-4'>
					<Button>Edit</Button>
					<Button>New Folder</Button>
					<Button>New Content</Button>
				</div>
			</div>
			<ContentTable />
		</div>
	);
};

export default ContentsManagementPage;
