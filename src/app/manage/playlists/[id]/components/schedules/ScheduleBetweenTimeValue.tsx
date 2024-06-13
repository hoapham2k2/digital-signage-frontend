import { TimePickerDemo } from "@/components/date_time_pickers/AppTimePicker";
import { useScheduleStore } from "@/lib/stores/schedule-store";
import { Schedule } from "@/types/index";
import { useEffect, useState } from "react";

type ScheduleBetweenTimeValueProps = {
	currentSchedule: Schedule;
};

export const ScheduleBetweenTimeValue: React.FC<
	ScheduleBetweenTimeValueProps
> = (_props: ScheduleBetweenTimeValueProps) => {
	const [startDate, setStartDate] = useState<Date | undefined>();
	const [endDate, setEndDate] = useState<Date | undefined>();

	const updateSchedule = useScheduleStore((state) => state.updateSchedule);

	useEffect(() => {
		// convert props.currentSchedule.scheduleValue = [new Date(), new Date()] to start and end date
		if (_props.currentSchedule.scheduleValue) {
			// try to convert to Date
			const startDate = new Date(_props.currentSchedule.scheduleValue[0]);
			const endDate = new Date(_props.currentSchedule.scheduleValue[1]);
			if (
				startDate.toString() !== "Invalid Date" &&
				endDate.toString() !== "Invalid Date"
			) {
				setStartDate(startDate);
				setEndDate(endDate);
			}

			// if invalid, set to undefined
			else {
				setStartDate(undefined);
				setEndDate(undefined);
			}
		}

		// if undefined, set to undefined
		else {
			setStartDate(undefined);
			setEndDate(undefined);
		}
	}, []);

	useEffect(() => {
		if (startDate && endDate) {
			updateSchedule({
				..._props.currentSchedule,
				scheduleValue: [startDate.toISOString(), endDate.toISOString()],
			} as Schedule);
		}
	}, [startDate, endDate]);

	return (
		<div className='flex flex-row gap-8 items-center'>
			<TimePickerDemo date={startDate} setDate={setStartDate} />
			<p className='mt-2'>to</p>
			<TimePickerDemo date={endDate} setDate={setEndDate} />
		</div>
	);
};
