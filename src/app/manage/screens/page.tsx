import ScreenTable from "@/components/table/ScreenTable";
import { Button } from "@/components/ui/button";
import { appStore } from "@/lib/stores/app-store";
import { Group, Playlist, Screen } from "@/lib/types";
import React from "react";
import { useParams } from "react-router-dom";

type Props = {};

const ScreensManagementPage = (props: Props) => {
	const screens: Screen[] = appStore((state) => state.screens);

	return (
		<div className=''>
			<div className='flex flex-row justify-between items-center'>
				<h1 className='text-2xl'>Screens</h1>
				<div className='flex flex-row gap-4'>
					<Button>Edit</Button>
					<Button>New Screen</Button>
				</div>
			</div>
			<ScreenTable screens={screens} />
		</div>
	);
};

export default ScreensManagementPage;
