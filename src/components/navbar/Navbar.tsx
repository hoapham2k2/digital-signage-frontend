import AppSearchbar from "./AppSearchbar";
import NewDropdownButton from "./NewDropdownButton";
import NotificationButton from "./NotificationButton";
import AccountSettingButton from "./AccountSettingButton";

type Props = {};

const Navbar = (_props: Props) => {
	return (
		<div className='h-14 border p-4 flex flex-row justify-between items-center'>
			<AppSearchbar />
			<div className='flex flex-row gap-4 items-center'>
				<NewDropdownButton />
				<NotificationButton />
				<AccountSettingButton />
			</div>
		</div>
	);
};

export default Navbar;
