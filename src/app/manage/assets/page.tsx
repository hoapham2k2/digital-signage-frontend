import { Button } from "@/components/ui/button";
import ContentTable from "./components/ContentTable";
import { useQuery } from "react-query";
import { fetchContents } from "@/apis/contents";
import { useContentStore } from "@/lib/stores/content-store";
import { useEffect } from "react";

type Props = NonNullable<unknown>;

const ContentsManagementPage = (_props: Props) => {
	const { setContents } = useContentStore((state) => ({
		setContents: state.setContents,
	}));
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

	useEffect(() => {
		if (contentDatas) {
			setContents(contentDatas);
		}
	}, [contentDatas, setContents]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error...</div>;
	}

	return (
		<div>
			<div className='flex flex-row justify-between items-center'>
				<h1 className='text-2xl'>Contents</h1>
				<div className='flex flex-row gap-4'>
					<Button>Edit</Button>
					<Button>New Folder</Button>
					<Button>New Content</Button>
				</div>
			</div>
			<ContentTable />
		</div>
	);
};

export default ContentsManagementPage;
