import AppDatePicker from "@/components/date_time_pickers/AppDatePicker";
import { TimePickerDemo } from "@/components/date_time_pickers/AppTimePicker";
import { Schedule, ScheduleOperatorForTime, ScheduleType } from "@/lib/types";
import ScheduleWeekdaysToggleGroup from "./ScheduleWeekdaysToggleGroup";

type ScheduleValueSectionProps = {
	currentSchedule: NonNullable<Schedule>;
};

export const ScheduleValueSection: React.FC<ScheduleValueSectionProps> = (
	_props: ScheduleValueSectionProps
) => {
	let dates = {
		start: new Date(),
		end: new Date(),
	};

	const handleStartChange = (date: Date | undefined) => {
		if (date) {
			dates.start = date;
		}
	};

	const handleEndChange = (date: Date | undefined) => {
		if (date) {
			dates.end = date;
		}
	};

	return (
		<div>
			{_props.currentSchedule.scheduleType === ScheduleType.TheDate && (
				<AppDatePicker />
			)}

			{_props.currentSchedule.scheduleType === ScheduleType.TheTime &&
				_props.currentSchedule.scheduleOperator ===
					ScheduleOperatorForTime.IsBetween && (
					<div className='flex flex-row gap-2'>
						<TimePickerDemo date={dates.start} setDate={handleStartChange} />
						<TimePickerDemo date={dates.end} setDate={handleEndChange} />
					</div>
				)}

			{_props.currentSchedule.scheduleType === ScheduleType.TheTime &&
				_props.currentSchedule.scheduleOperator !==
					ScheduleOperatorForTime.IsBetween && <AppDatePicker />}

			{_props.currentSchedule.scheduleType === ScheduleType.TheWeekdays && (
				<ScheduleWeekdaysToggleGroup />
			)}
		</div>
	);
};

export default ScheduleValueSection;
