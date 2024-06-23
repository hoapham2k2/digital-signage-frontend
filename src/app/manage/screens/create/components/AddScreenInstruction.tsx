import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const AddScreenInstruction: React.FC = () => {
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
				<Input placeholder='Enter PIN code' />
				<Input placeholder='Enter Screen Name' />
				<button
					className='
                    bg-blue-500 px-4 py-2 text-white rounded-md
                '>
					Add{" "}
				</button>
			</CardFooter>
		</Card>
	);
};

export default AddScreenInstruction;
