import { TimePickerDemo } from "@/components/date_time_pickers/AppTimePicker";
import { useScheduleStore } from "@/lib/stores/schedule-store";
import { Schedule } from "@/types/index";
import { useEffect, useState } from "react";
import { Control, FieldValues } from "react-hook-form";

type ScheduleBetweenTimeValueProps = {
	name: string;
	control: Control<FieldValues, any>;
};

export const ScheduleBetweenTimeValue: React.FC<
	ScheduleBetweenTimeValueProps
> = (_props: ScheduleBetweenTimeValueProps) => {
	const [startDate, setStartDate] = useState<Date | undefined>();
	const [endDate, setEndDate] = useState<Date | undefined>();

	return (
		<div className='flex flex-row gap-8 items-center'>
			<TimePickerDemo date={startDate} setDate={setStartDate} />
			<p className='mt-2'>to</p>
			<TimePickerDemo date={endDate} setDate={setEndDate} />
		</div>
	);
};
