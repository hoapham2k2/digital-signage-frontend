import { DataTable } from "@/components/table/DataTable";
import { ContentsColumns } from "./ContentColumns";
import { useQuery } from "react-query";
import { fetchContents } from "@/apis/contents";

type Props = NonNullable<unknown>;

const ContentTable = (_props: Props) => {
	const {
		data: contentDatas,
		isLoading,
		isError,
	} = useQuery({
		queryKey: "contents",
		queryFn: () => {
			return fetchContents();
		},
	});
	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (isError) {
		return <div>Error...</div>;
	}

	return (
		<div>
			<DataTable columns={ContentsColumns} data={contentDatas} type='content' />
		</div>
	);
};

export default ContentTable;
