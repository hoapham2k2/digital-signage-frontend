import AppDatePicker from "@/components/date_time_pickers/AppDatePicker";
import { TimePickerDemo } from "@/components/date_time_pickers/AppTimePicker";
import AppSelect from "@/components/select/AppSelect";
import { appStore } from "@/lib/stores/app-store";
import {
	Schedule,
	ScheduleOperatorForDate,
	ScheduleOperatorForTime,
	ScheduleOperatorForWeekdays,
	ScheduleType,
} from "@/lib/types";
import { cn } from "@/lib/utils";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

type Props = {};

const PlaylistDetailSchedule = (_props: Props) => {
	const { id } = useParams();
	const appSchedule = appStore((state) => {
		return state.schedules.find((schedule) => schedule.playlistId === id);
	});

	const [currentSchedule, setCurrentSchedule] = React.useState<Schedule>();
	useEffect(() => {
		if (appSchedule) {
			setCurrentSchedule(appSchedule);
		}
	}, [appSchedule]);
	// const [currentScheduleType, setCurrentScheduleType] =
	// 	React.useState<ScheduleType>(ScheduleType.TheDate);
	// const [currentScheduleOperator, setCurrentScheduleOperator] =
	// 	React.useState<ScheduleOperatorForDate>(ScheduleOperator.IsOnOrBefore);

	const ScheduleTypeComboboxValues: ScheduleType[] =
		Object.values(ScheduleType);

	const [ScheduleOperatorComboboxValues, setScheduleOperatorComboboxValues] =
		React.useState<
			| ScheduleOperatorForDate[]
			| ScheduleOperatorForTime[]
			| ScheduleOperatorForWeekdays[]
		>(Object.values(ScheduleOperatorForDate));

	useEffect(() => {
		if (currentSchedule) {
			switch (currentSchedule.scheduleType) {
				case ScheduleType.TheDate:
					setScheduleOperatorComboboxValues(
						Object.values(ScheduleOperatorForDate)
					);
					break;
				case ScheduleType.TheTime:
					setScheduleOperatorComboboxValues(
						Object.values(ScheduleOperatorForTime)
					);
					break;
				case ScheduleType.TheWeekdays:
					setScheduleOperatorComboboxValues(
						Object.values(ScheduleOperatorForWeekdays)
					);
					break;
				default:
					break;
			}
		}
	}, [currentSchedule]);

	const updateScheduleType = (scheduleType: ScheduleType): void => {
		if (currentSchedule) {
			setCurrentSchedule({
				...currentSchedule,
				scheduleType: scheduleType,
			});
		}
	};

	const updateScheduleOperator = (
		scheduleOperator:
			| ScheduleOperatorForDate
			| ScheduleOperatorForTime
			| ScheduleOperatorForWeekdays
	): void => {
		if (currentSchedule) {
			setCurrentSchedule({
				...currentSchedule,
				scheduleOperator: scheduleOperator,
			});
		}
	};

	return (
		<div className='w-full border border-red-300 p-2'>
			<hr />
			<div
				className={cn(
					"grid grid-cols-[1fr_1fr_auto]",
					"gap-2",
					"items-end",
					"justify-center",
					"w-full"
				)}>
				{/* Schedule type select */}
				{currentSchedule && (
					<AppSelect
						options={ScheduleTypeComboboxValues}
						selectedOption={currentSchedule.scheduleType}
						onSelect={updateScheduleType}
					/>
				)}
				{/* Schedule operator select */}
				{currentSchedule && (
					<AppSelect
						options={ScheduleOperatorComboboxValues}
						selectedOption={currentSchedule.scheduleOperator}
						onSelect={updateScheduleOperator}
					/>
				)}
				{/* Schedule value section */}
				{handleRenderScheduleValueSection(currentSchedule)}
			</div>
			<hr />
		</div>
	);
};

const handleRenderScheduleValueSection = (
	currentSchedule: Schedule | undefined
) => {
	const [date, setDate] = React.useState<Date>();
	if (currentSchedule) {
		switch (currentSchedule.scheduleType) {
			case ScheduleType.TheDate:
				return <AppDatePicker />;
			case ScheduleType.TheTime:
				if (
					currentSchedule.scheduleOperator === ScheduleOperatorForTime.IsBetween
				) {
					return (
						<div className='flex flex-row gap-2'>
							<TimePickerDemo date={date} setDate={setDate} />
							<TimePickerDemo date={date} setDate={setDate} />
						</div>
					);
				}
				return <AppDatePicker />;
			case ScheduleType.TheWeekdays:
				return <div></div>;
			default:
				return <div></div>;
		}
	}
};

export default PlaylistDetailSchedule;
