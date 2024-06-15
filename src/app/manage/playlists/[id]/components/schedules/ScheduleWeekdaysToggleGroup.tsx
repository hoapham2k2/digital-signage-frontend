import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useScheduleStore } from "@/lib/stores/schedule-store";
import { Schedule } from "@/types/index";
import { Control, Controller, FieldValues } from "react-hook-form";

type ComponentProps = {
	name: string;
	control: Control<FieldValues, any>;
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
	return (
		<Controller
			name={_props.name}
			control={_props.control}
			render={({ field }) => {
				return (
					<ToggleGroup
						type='multiple'
						size='sm'
						value={field.value.value.split(",") as string[]}
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
