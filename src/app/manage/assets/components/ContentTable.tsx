import { DataTable } from "@/components/table/DataTable";
import { ContentsColumns } from "./ContentColumns";
import { useQuery } from "react-query";
import { fetchContents } from "@/apis/contents";
import { Content } from "@/types/index";
import { useAuth } from "@/context/AuthContext";

const ContentTable = () => {
	const { user } = useAuth();
	const {
		data: contentDatas,
		isLoading,
		isError,
		isSuccess,
	} = useQuery<Content[]>({
		queryKey: "contents",
		queryFn: () => {
			return fetchContents(user?.id);
		},
		onSuccess: () => {},
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
