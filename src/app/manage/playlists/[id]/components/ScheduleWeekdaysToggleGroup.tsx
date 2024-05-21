import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type ComponentProps = NonNullable<unknown>;

export const ScheduleWeekdaysToggleGroup: React.FC<ComponentProps> = (
	_props: ComponentProps
) => {
	const datas: { value: string; label: string }[] = [
		{ value: "monday", label: "Mon" },
		{ value: "tuesday", label: "Tue" },
		{ value: "wednesday", label: "Wed" },
		{ value: "thursday", label: "Thu" },
		{ value: "friday", label: "Fri" },
		{ value: "saturday", label: "Sat" },
		{ value: "sunday", label: "Sun" },
	];

	return (
		<ToggleGroup
			type='multiple'
			size='sm'
			onValueChange={(values: string[]) => {
				console.log("You just selected: ", values);
			}}>
			{datas.map((data: { value: string; label: string }) => (
				<ToggleGroupItem key={data.value} value={data.value}>
					{data.label}
				</ToggleGroupItem>
			))}
		</ToggleGroup>
	);
};

export default ScheduleWeekdaysToggleGroup;
