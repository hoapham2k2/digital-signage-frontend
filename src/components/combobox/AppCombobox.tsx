import React from "react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

type Props = {
	options: string[];
	selectedOption?: string;
	onSelect: React.Dispatch<React.SetStateAction<string>>;
};

const AppCombobox = (props: Props) => {
	return (
		<Select
			defaultValue={props.selectedOption}
			onValueChange={(value) => {
				props.onSelect(value);
			}}>
			<SelectTrigger>
				<SelectValue placeholder={props.selectedOption || "Select an option"} />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{props.options.map((option) => (
						<SelectItem key={option} value={option}>
							{option}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};

export default AppCombobox;
