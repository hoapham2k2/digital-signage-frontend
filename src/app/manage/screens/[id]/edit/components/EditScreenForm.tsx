// import { Player } from "@/types/index";
// import EditScreenGroupLabelInput from "./EditScreenGroupLabelInput";
// import { Button } from "@/components/ui/button";
// import { useEffect, useState } from "react";
// import { useMutation, useQuery, useQueryClient } from "react-query";
// import { updateScreen } from "@/apis/screens";

// type Props = {
// 	screen: Screen;
// };

// const EditScreenForm = (props: Props) => {
// 	const [currentScreen, setCurrentScreen] = useState<Screen | null>(null);

// 	useEffect(() => {
// 		setCurrentScreen(props.screen);
// 	}, [props.screen]);

// 	const [isDataChanged, setIsDataChanged] = useState(false);
// 	const queryClient = useQueryClient();
// 	const { mutate } = useMutation(
// 		() =>
// 			updateScreen(
// 				currentScreen?.id as unknown as string,
// 				currentScreen as Omit<Screen, "id">
// 			),
// 		{
// 			onSuccess: () => {
// 				queryClient.invalidateQueries({
// 					queryKey: ["screen", currentScreen?.id],
// 				});
// 				setIsDataChanged(false);
// 			},
// 		}
// 	);
// 	const handleSaveScreen = async () => {
// 		mutate();
// 		setIsDataChanged(false);
// 	};

// 	const { data: currentGroupsBelongToScreen } = useQuery<Group[]>({
// 		queryKey: ["groups", currentScreen],
// 		queryFn: () => {
// 			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// 			//@ts-expect-error
// 			return fetchGroupByIds(currentScreen?.groups as string[]);
// 		},
// 		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// 		//@ts-expect-error
// 		enabled: !!currentScreen?.groups,
// 	});

// 	return (
// 		<div>
// 			{currentScreen && (
// 				<>
// 					<div className='flex flex-row justify-center items-center w-full h-fit bg-gray-200'>
// 						<div className='w-1/2 p-4 flex flex-col gap-4'>
// 							{currentGroupsBelongToScreen && (
// 								<EditScreenGroupLabelInput
// 									type='screen'
// 									// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// 									//@ts-expect-error
// 									groupIds={currentScreen.groups}
// 								/>
// 							)}
// 							<input
// 								className='w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300'
// 								type='text'
// 								value={currentScreen?.name}
// 								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
// 									setCurrentScreen({
// 										...currentScreen,
// 										name: e.target.value,
// 									});
// 									setIsDataChanged(true);
// 								}}
// 								placeholder='Screen Name'
// 							/>
// 						</div>
// 					</div>
// 					<div className='flex flex-row justify-end p-4 '>
// 						{isDataChanged && (
// 							<Button
// 								className='bg-blue-500 text-white'
// 								onClick={handleSaveScreen}>
// 								Save
// 							</Button>
// 						)}
// 					</div>
// 				</>
// 			)}
// 		</div>
// 	);
// };

// export default EditScreenForm;

const EditScreenForm = () => {
	return <div>Edit Screen Form</div>;
};

export default EditScreenForm;
