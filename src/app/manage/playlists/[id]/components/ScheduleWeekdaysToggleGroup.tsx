import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { appStore } from "@/lib/stores/app-store";
import { Schedule } from "@/lib/types";

type ComponentProps = {
	currentSchedule: Schedule;
};

const toggleGroupRecords: Record<string, string> = {
	monday: "Mon",
	tuesday: "Tue",
	wednesday: "Wed",
	thursday: "Thu",
	friday: "Fri",
	saturday: "Sat",
	sunday: "Sun",
};
export const ScheduleWeekdaysToggleGroup: React.FC<ComponentProps> = (
	_props: ComponentProps
) => {
	const updateSchedule = appStore((state) => state.updateSchedule);
	return (
		<ToggleGroup
			type='multiple'
			size='sm'
			value={_props.currentSchedule.scheduleValue as string[]}
			onValueChange={(values: string[]) => {
				console.log("You just selected: ", values);
				updateSchedule({
					..._props.currentSchedule,
					scheduleValue: values,
				});
			}}>
			{Object.entries(toggleGroupRecords).map(([value, label]) => (
				<ToggleGroupItem key={value} value={value}>
					{label}
				</ToggleGroupItem>
			))}
		</ToggleGroup>
	);
};

export default ScheduleWeekdaysToggleGroup;
