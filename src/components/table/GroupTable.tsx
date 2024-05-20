import { appStore } from "@/lib/stores/app-store";
import { DataTable } from "./DataTable";
import { GroupColumns } from "./GroupColumn";
import React from "react";

type Props = {
	setIsShowButton: React.Dispatch<React.SetStateAction<boolean>>;
};

const GroupTable = (props: Props) => {
	const groups = appStore((state) => state.groups);
	return (
		<div className='mt-4'>
			<DataTable
				columns={GroupColumns}
				data={groups}
				setIsShowSaveGroupButton={props.setIsShowButton}
			/>
		</div>
	);
};

export default GroupTable;
