import { fetchGroups } from "@/apis/groups";
import { Group } from "@/types/index";
import React from "react";
import { useQuery } from "react-query";
import { GroupLabelTableColumns } from "./GroupLabelTableColumn";
import { DataTable } from "./data-table";

type GroupLabelTableProps = {
	type: "screen" | "playlist";
	id: string;
};

const GroupLabelTable: React.FC<GroupLabelTableProps> = (
	_props: GroupLabelTableProps
) => {
	const { data: groups } = useQuery<Group[]>({
		queryKey: ["groups"],
		queryFn: () => {
			return fetchGroups();
		},
	});
	return (
		<div>
			<DataTable
				columns={GroupLabelTableColumns}
				data={groups ?? []}
				type={_props.type}
			/>
		</div>
	);
};

export default GroupLabelTable;
