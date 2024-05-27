import { DataTable } from "@/components/table/DataTable";
import { ContentsColumns } from "./ContentColumns";
import { useContentStore } from "@/lib/stores/content-store";

type Props = NonNullable<unknown>;

const ContentTable = (_props: Props) => {
	const { contentData } = useContentStore((state) => ({
		contentData: state.contents,
	}));
	return (
		<div>
			<DataTable isContent columns={ContentsColumns} data={contentData} />
		</div>
	);
};

export default ContentTable;
