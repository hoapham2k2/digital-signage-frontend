import { useQuery } from "react-query";
import { DataTable } from "./DataTable";
import { ScreenColumns } from "./ScreenColumn";
import { Screen } from "@/types/index";
import { fetchScreens } from "@/apis/screens";


const ScreenTable = () => {
	const {
		data: screens,
		isLoading,
		isError,
		isSuccess,
	} = useQuery<Screen[]>({
		queryKey: "screens",
		queryFn: fetchScreens,
	});

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error {isError}</div>;

	if (isSuccess)
		return (
			<div className='py-10'>
				<DataTable columns={ScreenColumns} data={screens} type='screen' />
			</div>
		);
};

export default ScreenTable;
