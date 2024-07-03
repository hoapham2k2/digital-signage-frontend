import ContentTable from "./components/ContentTable";
import NewContentButton from "./components/NewContentButton";


const ContentsManagementPage = () => {
	return (
		<div>
			<div className='flex flex-row justify-between items-center'>
				<h1 className='text-2xl'>Contents</h1>
				<div className='flex flex-row gap-4'>
					<NewContentButton />
				</div>
			</div>
			<ContentTable />
		</div>
	);
};

export default ContentsManagementPage;
