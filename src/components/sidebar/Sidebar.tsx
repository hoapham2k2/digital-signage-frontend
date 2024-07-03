import SidebarItem, { SidebarItemProps } from "./SidebarItem";
import { MdDashboard, MdOutlineScreenshotMonitor } from "react-icons/md";
import { VscFileMedia, VscFiles } from "react-icons/vsc";
import { FiSettings } from "react-icons/fi";

const Sidebar = () => {
	const SidebarItems: SidebarItemProps[] = [
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
	return (
		<aside className={"w-64 bg-gray-800 text-white fixed h-full"}>
			<div className='flex flex-col p-4'>
				<div className={"py-8"}></div>
				<div className='flex flex-col gap-2'>
					{SidebarItems.map((item, index) => (
						<SidebarItem key={index} {...item} />
					))}
				</div>
			</div>
		</aside>
	);
};

export default Sidebar;
