import { fetchScreens } from "@/apis/screens";
import ScreenTable from "@/components/table/ScreenTable";
import { Button } from "@/components/ui/button";
import { useScreenStore } from "@/lib/stores/screen-store";
import { Screen } from "@/lib/types";
import { useEffect } from "react";
import { useQuery } from "react-query";

type Props = NonNullable<unknown>;

const ScreensManagementPage = (_props: Props) => {
	const { setScreens } = useScreenStore((state) => ({
		setScreens: state.setScreens,
	}));
	const {
		data: screens,
		isLoading,
		isError,
	} = useQuery<Screen[]>({
		queryKey: "screens",
		queryFn: fetchScreens,
	});

	useEffect(() => {
		if (screens) {
			setScreens(screens);
		}
	}, [screens, setScreens]);

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error</div>;

	return (
		<div className=''>
			{screens && (
				<>
					<div className='flex flex-row justify-between items-center'>
						<h1 className='text-2xl'>Screens</h1>
						<div className='flex flex-row gap-4'>
							<Button>Edit</Button>
							<Button>New Screen</Button>
						</div>
					</div>
					<ScreenTable screens={screens} />
				</>
			)}
		</div>
	);
};

export default ScreensManagementPage;
