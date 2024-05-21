import { appStore } from "@/lib/stores/app-store";
import { Schedule, ScheduleOperatorForDate, ScheduleType } from "@/lib/types";
import { cn } from "@/lib/utils";
import React from "react";
import AppSelect from "@/components/select/AppSelect";
import { Button } from "@/components/ui/button";
import ScheduleValueSection from "./ScheduleValueSection";

type Props = {
	playlistId: NonNullable<string>;
};
const PlaylistDetailSchedule = (_props: Props) => {
	const { addSchedule, deleteSchedule, appSchedules } = appStore((state) => ({
		appSchedules: state.schedules.filter(
			(schedule) => schedule.playlistId === _props.playlistId
		),
		addSchedule: state.addSchedule,
		deleteSchedule: state.deleteSchedule,
	}));

	const handleAddSchedule = async (_e: React.MouseEvent<HTMLButtonElement>) => {
		const defaultSchedule: Schedule = {
			id: "",
			playlistId: _props.playlistId,
			scheduleType: ScheduleType.TheDate,
			scheduleOperator: ScheduleOperatorForDate.IsOnOrBefore,
			scheduleValue: "",
		};
		await addSchedule(defaultSchedule);
	};

	return (
		<div className='w-full border border-red-300 p-2'>
			<hr />
			<div className='flex flex-col gap-2'>
				{appSchedules &&
					appSchedules.map((currentSchedule: Schedule, index: number) => {
						return (
							<div
								key={index}
								className={cn(
									"grid grid-cols-[1fr_1fr_1fr_auto]",
									"gap-2",
									"items-end",
									"justify-center",
									"w-full"
								)}>
								<AppSelect
									componentType='scheduleType'
									currentSchedule={currentSchedule}
								/>
								<AppSelect
									componentType='scheduleOperator'
									currentSchedule={currentSchedule}
								/>
								<ScheduleValueSection currentSchedule={currentSchedule} />
								<div className='flex flex-row gap-1'>
									<Button onClick={handleAddSchedule}>Add</Button>

									<Button onClick={() => deleteSchedule(currentSchedule.id)}>
										Delete
									</Button>
								</div>
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default PlaylistDetailSchedule;
