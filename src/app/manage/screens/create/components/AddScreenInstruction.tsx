import React from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "react-query";
import { createHardwareScreen } from "@/apis/screens";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";

export const AddScreenInstruction: React.FC = () => {
	const { user } = useAuth();
	const [pinCode, setPinCode] = React.useState<string>("");
	const [screenName, setScreenName] = React.useState<string>("");
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { toast } = useToast();

	const { mutate: createHardwareScreenMutation } = useMutation(
		({ name, otpCode }: { name: string; otpCode: string }) => {
			return createHardwareScreen(name, otpCode, user?.id as string);
		},
		{
			onSuccess: () => {
				toast({
					title: "Added Screen status",
					description: "Screen added successfully",
				});
				setPinCode("");
				setScreenName("");
				queryClient.invalidateQueries("screens");
				navigate("/manage/screens");
			},
		}
	);

	return (
		<Card className='flex-1'>
			<CardHeader>
				<p>
					<strong>2. </strong>Pair your Digital Signage Player with your screen
				</p>
			</CardHeader>
			<CardContent className='flex flex-col gap-2'>
				<p>
					Turn on your Digital Signage Player and connect it to your screen with
					an HDMI cable. Next, connect your Digital Signage Player to the
					internet via ethernet cable or Wi-Fi. To connect via Wi-Fi, click the
					“Wi-Fi Configuration” button above
				</p>

				<img src='/login_screenly_player.png' alt='Digital Signage Player' />

				<p>
					Please wait a few minutes for your Digital Signage Player to boot and
					display its unique PIN code on your screen. Next, enter the PIN code
					in the field below. You can also add a custom name for each screen.
				</p>
			</CardContent>
			<CardFooter className='flex flex-row gap-2 items-center'>
				<Input
					placeholder='Enter PIN code'
					value={pinCode}
					onChange={(e) => setPinCode(e.target.value)}
				/>
				<Input
					placeholder='Enter Screen Name'
					value={screenName}
					onChange={(e) => setScreenName(e.target.value)}
				/>
				<button
					className='
                    bg-blue-500 px-4 py-2 text-white rounded-md
                '
					onClick={() => {
						createHardwareScreenMutation({
							name: screenName,
							otpCode: pinCode,
						});
					}}>
					Add
				</button>
			</CardFooter>
		</Card>
	);
};

export default AddScreenInstruction;
