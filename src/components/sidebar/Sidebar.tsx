import React from "react";
import SidebarItem, { SidebarItemProps } from "./SidebarItem";
import { MdDashboard, MdOutlineScreenshotMonitor } from "react-icons/md";
import { VscFileMedia, VscFiles } from "react-icons/vsc";
import { FiSettings } from "react-icons/fi";

type Props = {};

const Sidebar = (props: Props) => {
	const SidebarItems: SidebarItemProps[] = [
		{ name: "Dashboard", icon: MdDashboard, href: "/manage/dashboard" },
		{
			name: "Screens",
			icon: MdOutlineScreenshotMonitor,
			href: "/manage/screens",
		},
		{ name: "Playlists", icon: VscFileMedia, href: "/manage/playlists" },
		{ name: "Content", icon: VscFiles, href: "/manage/assets" },
		{ name: "Settings", icon: FiSettings, href: "/manage/account" },
	];
	return (
		<div
			className={`lg:flex lg:flex-col lg:justify-between lg:w-64 lg:py-4 lg:px-2 lg:bg-gray-800 lg:text-white`}>
			<div className='lg:space-y-4'>
				{SidebarItems.map((item, index) => (
					<SidebarItem key={index} {...item} />
				))}
			</div>
		</div>
	);
};

export default Sidebar;
