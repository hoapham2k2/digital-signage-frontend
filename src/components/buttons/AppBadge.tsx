import { Badge, BadgeProps } from "../ui/badge";

interface AppBadgeProps extends BadgeProps {
	name: string;
}

const AppBadge = (props: AppBadgeProps) => {
	return (
		<Badge color='gray' className='mr-1' {...props}>
			{props.name}
		</Badge>
	);
};

export default AppBadge;
