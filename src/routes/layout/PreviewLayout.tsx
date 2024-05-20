import React from "react";
import { Outlet } from "react-router-dom";

type Props = {};

const PreviewLayout = (props: Props) => {
	return (
		<div>
			<Outlet />
		</div>
	);
};

export default PreviewLayout;
