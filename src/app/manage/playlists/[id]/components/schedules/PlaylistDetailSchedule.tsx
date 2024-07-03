import { ScheduleType } from "@/types/index";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import ScheduleValueSection from "./ScheduleValueSection";
import { useFieldArray, useFormContext } from "react-hook-form";
import ScheduleTypeSelect from "./ScheduleTypeSelect";
import ScheduleOperatorSelect from "./ScheduleOperatorSelect";
import { PlaylistFormValueTypes } from "../../page";

const PlaylistDetailSchedule = () => {
	const { control } = useFormContext<PlaylistFormValueTypes>();

	const { fields, append, remove } = useFieldArray<PlaylistFormValueTypes>({
		control: control,
		name: "playlist.schedules",
	});

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
									key={_item.id}
									className={cn(
										"grid grid-cols-[1fr_1fr_1fr_auto]",
										"gap-2",
										"items-end",
										"justify-center",
										"w-full"
									)}>
									<ScheduleTypeSelect index={index} />

									<ScheduleOperatorSelect index={index} />
									<ScheduleValueSection index={index} />
									<div className='flex flex-row gap-1'>
										<Button
											onClick={(e) => {
												e.preventDefault();
												e.stopPropagation();
												append({
													type: ScheduleType.TheDate,
													operator: "IsOn",
													value: new Date().toISOString(),
													..._item,
												});
											}}>
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
