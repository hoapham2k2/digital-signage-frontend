import { Button } from "../ui/button";
import { IoIosNotifications } from "react-icons/io";
import { Badge } from "../ui/badge";

type Props = {};

const NotificationButton = (_props: Props) => {
	return (
		<Button className='relative' variant={"ghost"}>
			<IoIosNotifications className='w-6 h-6' />
			<Badge className='absolute top-0 right-0 text-xs' variant={"destructive"}>
				3
			</Badge>
		</Button>
	);
};

export default NotificationButton;
