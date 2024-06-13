import { Schedule } from "@/types/index";
import { cn } from "@/lib/utils";
import React from "react";
import AppSelect from "@/app/manage/playlists/[id]/components/schedules/AppSelect";
import { Button } from "@/components/ui/button";
import ScheduleValueSection from "./ScheduleValueSection";
import { useScheduleStore } from "@/lib/stores/schedule-store";
import {
	Controller,
	useFieldArray,
	useForm,
	useFormContext,
} from "react-hook-form";
import ScheduleTypeSelect from "./ScheduleTypeSelect";
import ScheduleOperatorSelect from "./ScheduleOperatorSelect";

type Props = {
	playlistId: string;
};

const scheduleOptionsMap = {
	"The Date": ["Is On Or Before", "Is Exactly", "Is On Or After"],
	"The Time": ["Is Between", "Is Between"],
	"The Weekdays": ["Is On", "Is Not On"],
};
const PlaylistDetailSchedule = (_props: Props) => {
	// const { addSchedule, deleteSchedule, appSchedules } = useScheduleStore(
	// 	(state) => ({
	// 		appSchedules: state.schedules.filter(
	// 			(schedule) => schedule.playlistId === _props.playlistId
	// 		),
	// 		addSchedule: state.addSchedule,
	// 		deleteSchedule: state.deleteSchedule,
	// 	})
	// );

	// const handleAddSchedule = (_e: React.MouseEvent<HTMLButtonElement>) => {
	// 	addSchedule(_props.playlistId);
	// };

	const methods = useFormContext();

	const { control, handleSubmit, reset, watch } = methods;
	const { fields, append, remove } = useFieldArray({
		control,
		name: "playlist.schedules",
	});

	console.log("fields", fields);

	return (
		<div>
			<h2 className='text-base'>Schedule</h2>
			<div className='w-full border border-red-300 p-2'>
				<hr />
				<div className='flex flex-col gap-2'>
					{fields &&
						fields.map((_item, index: number) => {
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
									<ScheduleTypeSelect
										control={control}
										name={`playlist.schedules[${index + 1}]`}
									/>

									<ScheduleOperatorSelect
										control={control}
										name={`playlist.schedules[${index}]`}
									/>
									<ScheduleValueSection
										control={control}
										name={`playlist.schedules[${index}]`}
									/>
									<div className='flex flex-row gap-1'>
										<Button
											onClick={() =>
												append({
													scheduleType: "The Date",
													scheduleOperator: "Is On Or Before",
												})
											}>
											Add
										</Button>

										<Button onClick={() => remove(index)}>Delete</Button>
									</div>
								</div>
							);
						})}
				</div>
			</div>
		</div>
	);
};

export default PlaylistDetailSchedule;
