import Navbar from "@/components/navbar/Navbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
	return (
		<div className={""}>
			<Navbar />
			<main className={"mt-16 p-8"}>
				<Outlet />
			</main>
		</div>
	);
};

export default RootLayout;
