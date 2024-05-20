import { Group, Screen } from "@/lib/types";
import EditScreenGroupLabelInput from "./EditScreenGroupLabelInput";
import { appStore } from "@/lib/stores/app-store";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

type Props = {
	screen?: Screen;
};

const EditScreenForm = (props: Props) => {
	const groups: Group[] = appStore((state) => state.groups);
	const [isButtonDisabled, setIsButtonDisabled] = useState(true);
	const [inputNamevalue, setInputNameValue] = useState(
		props.screen?.name || ""
	);
	const updateScreen = appStore((state) => state.updateScreen);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputNameValue(e.target.value);
	};

	useEffect(() => {
		if (inputNamevalue.trim() && inputNamevalue !== props.screen?.name) {
			setIsButtonDisabled(false);
		} else {
			setIsButtonDisabled(true);
		}
	}, [inputNamevalue, props.screen?.name]);

	const handleSaveScreen = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (props.screen) {
			updateScreen({
				...props.screen,
				name: inputNamevalue,
			});
		}

		setIsButtonDisabled(true);
	};

	return (
		<div>
			<div className='flex flex-row justify-center items-center w-full h-fit bg-gray-200'>
				<div className='w-1/2 p-4 flex flex-col gap-4'>
					<EditScreenGroupLabelInput
						groupLabelNames={
							props.screen?.groups.map((groupId) => {
								const group = groups.find((g) => g.id === groupId);
								return group?.name || "";
							}) || []
						}
					/>
					<input
						className='w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300'
						type='text'
						value={inputNamevalue}
						onChange={handleInputChange}
						placeholder='Screen Name'
					/>
				</div>
			</div>
			<div className='flex flex-row justify-end p-4 '>
				{isButtonDisabled ? (
					<Button disabled className='bg-gray-300 text-gray-500'>
						Save
					</Button>
				) : (
					<Button className='bg-blue-500 text-white' onClick={handleSaveScreen}>
						Save
					</Button>
				)}
			</div>
		</div>
	);
};

export default EditScreenForm;
