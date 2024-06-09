import { DataTable } from "@/components/table/DataTable";
import { ContentsColumns } from "./ContentColumns";
import { useQuery } from "react-query";
import { fetchContents } from "@/apis/contents";
import { Content } from "@/lib/types";

type Props = NonNullable<unknown>;

const ContentTable = (_props: Props) => {
	const {
		data: contentDatas,
		isLoading,
		isError,
		isSuccess,
	} = useQuery<Content[]>({
		queryKey: "contents",
		queryFn: () => {
			return fetchContents();
		},
		onSuccess: () => {
			console.log("Contents fetched successfully");
		},
	});
	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (isError) {
		return <div>Error...</div>;
	}
	if (isSuccess)
		return (
			<div>
				<DataTable
					columns={ContentsColumns}
					data={contentDatas}
					type='content'
				/>
			</div>
		);
};

export default ContentTable;
