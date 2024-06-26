import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import ScreenStatus from "./components/ScreenStatus";
import StatusMapLeaf from "./components/StatusMapLeaf";

type Props = NonNullable<unknown>;

const DashboardPage = (_props: Props) => {
	return (
		<div>
			{/* Page Header */}
			<div>
				<h3>Dashboard</h3>
			</div>

			{/* Page Content */}
			<div className='flex flex-col gap-4'>
				<ScreenStatus />
				<StatusMapLeaf />
			</div>
		</div>
	);
};

export default DashboardPage;
