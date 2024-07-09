import { fetchGroups } from "@/apis/groups";
import { Label } from "@/types/index";
import React from "react";
import { useQuery } from "react-query";
import { GroupLabelTableColumns } from "./GroupLabelTableColumn";
import { DataTable } from "./data-table";
import { useAuth } from "@/context/AuthContext";

type GroupLabelTableProps = {
	type: "screen" | "playlist";
	id: string;
};

const GroupLabelTable: React.FC<GroupLabelTableProps> = (
	_props: GroupLabelTableProps
) => {
	const { user } = useAuth();
	const { data: groups } = useQuery<Label[]>({
		queryKey: ["groups"],
		queryFn: () => {
			return fetchGroups(user?.id);
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
