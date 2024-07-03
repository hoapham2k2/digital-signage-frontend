import { FiSettings } from "react-icons/fi";
import { MdDashboard, MdOutlineScreenshotMonitor } from "react-icons/md";
import { VscFileMedia, VscFiles } from "react-icons/vsc";

import { NavLink } from "react-router-dom";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
} from "../ui/navigation-menu";

const MenuItems = [
	{ name: "Dashboard", icon: MdDashboard, href: "/manage/dashboard" },
	{
		name: "Screens",
		icon: MdOutlineScreenshotMonitor,
		href: "/manage/screens",
	},
	{ name: "Playlists", icon: VscFileMedia, href: "/manage/playlists" },
	{ name: "Content", icon: VscFiles, href: "/manage/assets" },
	{ name: "Settings", icon: FiSettings, href: "/manage/ac	count" },
];

export const AppMenu: React.FC = () => {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				{MenuItems.map((item, index) => (
					<NavigationMenuItem key={index}>
						<NavLink
							to={item.href}
							className={({ isActive }) =>
								`block mt-2 ${
									isActive ? "bg-gray-900 text-white" : "text-gray-300"
								} rounded-md p-2 hover:bg-gray-700 hover:text-white transition-colors duration-200 ease-in-out flex items-center gap-2`
							}>
							<span>{item.name}</span>
						</NavLink>
					</NavigationMenuItem>
				))}
			</NavigationMenuList>
		</NavigationMenu>
	);
};

export default AppMenu;
