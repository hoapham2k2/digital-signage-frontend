import { cn } from "@/lib/utils";
import { IconType } from "react-icons";
import { Link, useLocation } from "react-router-dom";

export interface SidebarItemProps {
	name: string;
	href: string;
	icon?: IconType;
}

const SidebarItem = (props: SidebarItemProps) => {
	const location = useLocation();
	return (
		<>
			<Link to={props.href}>
				<div
					className={cn(
						location.pathname === props.href
							? "bg-gray-700 text-white"
							: "text-gray-300",
						"flex flex-row lg:px-4 lg:py-2 lg:text-lg lg:font-semibold rounded-md items-center cursor-pointer transition-colors duration-300 hover:bg-gray-700 hover:text-white"
					)}>
					{props.icon && <props.icon className='mr-2' />}
					{props.name}
				</div>
			</Link>
		</>
	);
};

export default SidebarItem;
