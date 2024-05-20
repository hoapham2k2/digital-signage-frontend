import { DataTable } from "@/components/table/DataTable";
import React from "react";
import { ContentsColumns } from "./ContentColumns";
import { AppType, appStore } from "@/lib/stores/app-store";
import { Content } from "@/lib/types";

type Props = {};

const ContentTable = (props: Props) => {
	const contentData: Content[] = appStore((state: AppType) => state.contents);
	return (
		<div>
			<DataTable isContent columns={ContentsColumns} data={contentData} />
		</div>
	);
};

export default ContentTable;
