import { DataTable } from "./DataTable";
import { ScreenColumns } from "./ScreenColumn";
import { Screen } from "@/lib/types";

type Props = {
	screens: Screen[];
};

const ScreenTable = (props: Props) => {
	return (
		<div className='py-10'>
			<DataTable columns={ScreenColumns} data={props.screens} type='screen' />
		</div>
	);
};

export default ScreenTable;
