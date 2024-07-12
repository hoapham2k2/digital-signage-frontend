import NewDropdownButton from "./NewDropdownButton";
// import NotificationButton from "./NotificationButton";
import AccountSettingButton from "./AccountSettingButton";
import AppMenu from "./AppMenu";
import { NavLink } from "react-router-dom";


const Navbar = () => {
	return (
		<nav
			className={
				"overflow-hidden bg-slate-800 text-white fixed top-0 w-full z-10"
			}>
			<div className='w-full flex flex-row justify-between items-center px-6 py-3 h-full'>
				<div className='flex flex-row items-center gap-4'>
					<NavLink to='/' className='text-2xl font-semibold'>
						Digital Signage
					</NavLink>
					<AppMenu />
				</div>
				<div className='flex flex-row gap-2'>
					<NewDropdownButton />
					{/* <NotificationButton /> */}
					<AccountSettingButton />
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
