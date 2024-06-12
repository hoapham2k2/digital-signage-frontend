import { Group, Screen } from "@/types/index";
import EditScreenGroupLabelInput from "./EditScreenGroupLabelInput";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { updateScreen } from "@/apis/screens";
import { fetchGroupByIds } from "@/apis/groups";

type Props = {
	screen: Screen;
};

const EditScreenForm = (props: Props) => {
	const [currentScreen, setCurrentScreen] = useState<Screen | null>(null);

	useEffect(() => {
		setCurrentScreen(props.screen);
	}, [props.screen]);

	const [isDataChanged, setIsDataChanged] = useState(false);
	const queryClient = useQueryClient();
	const { mutate } = useMutation(
		() =>
			updateScreen(
				currentScreen?.id as string,
				currentScreen as Omit<Screen, "id">
			),
		{
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: ["screen", currentScreen?.id],
				});
				setIsDataChanged(false);
			},
		}
	);
	const handleSaveScreen = async (_e: React.MouseEvent<HTMLButtonElement>) => {
		await mutate();
		await setIsDataChanged(false);
	};

	const { data: currentGroupsBelongToScreen } = useQuery<Group[]>({
		queryKey: ["groups", currentScreen?.groups],
		queryFn: () => {
			return fetchGroupByIds(currentScreen?.groups as string[]);
		},
		enabled: !!currentScreen?.groups,
	});

	return (
		<div>
			{currentScreen && (
				<>
					<div className='flex flex-row justify-center items-center w-full h-fit bg-gray-200'>
						<div className='w-1/2 p-4 flex flex-col gap-4'>
							{currentGroupsBelongToScreen && (
								<EditScreenGroupLabelInput
									type='screen'
									groupIds={currentScreen.groups}
								/>
							)}
							<input
								className='w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300'
								type='text'
								value={currentScreen?.name}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									setCurrentScreen({
										...currentScreen,
										name: e.target.value,
									});
									setIsDataChanged(true);
								}}
								placeholder='Screen Name'
							/>
						</div>
					</div>
					<div className='flex flex-row justify-end p-4 '>
						{isDataChanged && (
							<Button
								className='bg-blue-500 text-white'
								onClick={handleSaveScreen}>
								Save
							</Button>
						)}
					</div>
				</>
			)}
		</div>
	);
};

export default EditScreenForm;
