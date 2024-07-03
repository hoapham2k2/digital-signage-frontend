import ScreenStatus from "./components/ScreenStatus";
import StatusMapLeaf from "./components/StatusMapLeaf";

const DashboardPage = () => {
	return (
		<div>
			{/* Page Header */}
			<div>
				<h3>Dashboard</h3>
			</div>

			{/* Page Content */}
			<div className='flex flex-col gap-10'>
				<ScreenStatus />
				<StatusMapLeaf />
			</div>
		</div>
	);
};

export default DashboardPage;
