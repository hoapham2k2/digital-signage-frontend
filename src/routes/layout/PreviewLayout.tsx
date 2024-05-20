import { Outlet } from "react-router-dom";

type Props = {};

const PreviewLayout = (_props: Props) => {
	return (
		<div>
			<Outlet />
		</div>
	);
};

export default PreviewLayout;
