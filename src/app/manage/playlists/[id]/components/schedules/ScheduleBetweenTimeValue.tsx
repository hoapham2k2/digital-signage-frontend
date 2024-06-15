import { TimePickerDemo } from "@/components/date_time_pickers/AppTimePicker";
import { Control, Controller, FieldValues } from "react-hook-form";

type ScheduleBetweenTimeValueProps = {
	name: string;
	control: Control<FieldValues, any>;
};

export const ScheduleBetweenTimeValue: React.FC<
	ScheduleBetweenTimeValueProps
> = (_props: ScheduleBetweenTimeValueProps) => {
	return (
		<div className='flex flex-row gap-8 items-center'>
			<Controller
				name={_props.name}
				control={_props.control}
				render={({ field }) => {
					return (
						<>
							<TimePickerDemo
								date={new Date(field.value.value.split(",")[0])}
								setDate={(date) => {
									//
									if (!date) return;
									field.onChange({
										...field.value,
										value: `${date.toISOString()},${
											field.value.value.split(",")[1]
										}`,
									});
								}}
							/>
							<TimePickerDemo
								date={new Date(field.value.value.split(",")[1])}
								setDate={(date) => {
									//
									if (!date) return;
									field.onChange({
										...field.value,
										value: `${
											field.value.value.split(",")[0]
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
