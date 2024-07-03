import { TimePickerDemo } from "@/components/date_time_pickers/AppTimePicker";
import { Controller, useFormContext } from "react-hook-form";

type ScheduleBetweenTimeValueProps = {
	index: number;
};

export const ScheduleBetweenTimeValue: React.FC<
	ScheduleBetweenTimeValueProps
> = (_props: ScheduleBetweenTimeValueProps) => {
	const { control } = useFormContext();
	return (
		<div className='flex flex-row gap-8 items-center'>
			<Controller
				control={control}
				name={`playlist.schedules.${_props.index}`}
				render={({ field }) => {
					return (
						<>
							<TimePickerDemo
								date={new Date(field.value.value?.split(",")[0])}
								setDate={(date) => {
									if (!date) return;
									field.onChange({
										...field.value,
										value: `${date.toISOString()},${
											field.value.value?.split(",")[1]
										}`,
									});
								}}
							/>
							<TimePickerDemo
								date={new Date(field.value.value?.split(",")[1])}
								setDate={(date) => {
									if (!date) return;
									field.onChange({
										...field.value,
										value: `${
											field.value.value?.split(",")[0]
										},${date.toISOString()}`,
									});
								}}
							/>
						</>
					);
				}}
			/>
		</div>
	);
};
