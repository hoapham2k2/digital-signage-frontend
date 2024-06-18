import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useScheduleStore } from "@/lib/stores/schedule-store";
import { Schedule } from "@/types/index";
import {
	Control,
	Controller,
	FieldValues,
	useFormContext,
} from "react-hook-form";

type ComponentProps = {
	index: number;
};

const toggleGroupRecords: Record<string, string> = {
	Monday: "Mon",
	Tuesday: "Tue",
	Wednesday: "Wed",
	Thursday: "Thu",
	Friday: "Fri",
	Saturday: "Sat",
	Sunday: "Sun",
};
export const ScheduleWeekdaysToggleGroup: React.FC<ComponentProps> = (
	_props: ComponentProps
) => {
	const { control } = useFormContext();
	return (
		<Controller
			control={control}
			name={`playlist.schedules.${_props.index}`}
			render={({ field }) => {
				return (
					<ToggleGroup
						type='multiple'
						size='sm'
						value={(field.value.value.split(",") as string[]) ?? []}
						onValueChange={(newvalue) => {
							field.onChange({
								...field.value,
								value: newvalue.join(","),
							});
						}}>
						{Object.entries(toggleGroupRecords).map(([key, value]) => (
							<ToggleGroupItem key={key} value={key}>
								{value}
							</ToggleGroupItem>
						))}
					</ToggleGroup>
				);
			}}
		/>
	);
};

export default ScheduleWeekdaysToggleGroup;
