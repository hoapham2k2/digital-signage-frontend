import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

type Props = {};

const RootLayout = (props: Props) => {
	return (
		<div className='lg:grid lg:grid-cols-[auto,1fr] h-screen overflow-x-hidden overflow-hidden'>
			<Sidebar />
			<div className='lg:grid lg:grid-rows-[auto,1fr] overflow-y-auto'>
				<Navbar />
				<div className='p-4 overflow-y-auto'>
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default RootLayout;
