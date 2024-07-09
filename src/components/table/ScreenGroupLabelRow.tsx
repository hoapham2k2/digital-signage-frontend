import { fetchGroupsByScreenId } from "@/apis/groups";
import { Label } from "@/types";
import { useQuery } from "react-query";
import AppBadge from "../buttons/AppBadge";

export default function ScreenGroupLabelRow({ row }: { row: any }) {
	const currentScreen = row.original;
	const {
		data: groups,
		isLoading,
		isError,
	} = useQuery<Label[]>({
		queryKey: ["groups", { screenId: currentScreen.id }],
		queryFn: async () => {
			return fetchGroupsByScreenId({
				screenId: currentScreen.id as unknown as string,
			});
		},
		enabled: !!currentScreen.id,
	});

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error</div>;
	if (groups)
		return (
			<div className='flex flex-row gap-1'>
				{groups &&
					groups.map((group) => <AppBadge key={group.id} name={group.name} />)}
			</div>
		);
	return null;
}
