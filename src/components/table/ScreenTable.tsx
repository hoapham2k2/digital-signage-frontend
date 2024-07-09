import { useQuery } from "react-query";
import { DataTable } from "./DataTable";
import { ScreenColumns } from "./ScreenColumn";
import { Player } from "@/types/index";
import { fetchScreens } from "@/apis/screens";
import { useAuth } from "@/context/AuthContext";

const ScreenTable = () => {
	const { user } = useAuth();
	const {
		data: screens,
		isLoading,
		isError,
		isSuccess,
	} = useQuery<Player[]>({
		queryKey: "screens",
		queryFn: () => {
			return fetchScreens(user?.id);
		},
	});

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error {isError}</div>;

	if (isSuccess)
		return <DataTable columns={ScreenColumns} data={screens} type='screen' />;
};

export default ScreenTable;
