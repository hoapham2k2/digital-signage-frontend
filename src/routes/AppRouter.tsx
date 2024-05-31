import {
	Navigate,
	RouterProvider,
	createBrowserRouter,
} from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import DashboardPage from "@/app/manage/dashboard/page";
import ScreensManagementPage from "@/app/manage/screens/page";
import ScreenDetailPage from "@/app/manage/screens/[id]/page";
import PreviewLayout from "./layout/PreviewLayout";
import PlaylistsManagementPage from "@/app/manage/playlists/page";
import ContentsManagementPage from "@/app/manage/assets/page";
import AccountSettingManagementPage from "@/app/manage/account/page";
import PlaylistDetailPage from "@/app/manage/playlists/[id]/page";
import EditScreenDetailPage from "@/app/manage/screens/[id]/edit/page";
import AssetDetailPage from "@/app/manage/assets/[id]/page";
import PlaylistDetailPreview from "@/app/manage/playlists/[id]/preview/page";
type Props = NonNullable<unknown>;

const routes = createBrowserRouter([
	{
		element: <RootLayout />,
		children: [
			{
				path: "/",
				element: <Navigate to='/manage/dashboard' replace />,
			},
			{
				path: "/manage",
				element: <Navigate to='/mange/dashboard' replace />,
			},
			{
				path: "/manage/dashboard",
				element: <DashboardPage />,
			},
			{
				path: "manage/screens",
				element: <ScreensManagementPage />,
			},
			{
				path: "manage/screens/:id",
				element: <ScreenDetailPage />,
			},
			{
				path: "manage/screens/:id/edit",
				element: <EditScreenDetailPage />,
			},
			{
				path: "manage/playlists",
				element: <PlaylistsManagementPage />,
			},
			{
				path: "manage/playlists/:id",
				element: <PlaylistDetailPage />,
			},

			{
				path: "manage/assets",
				element: <ContentsManagementPage />,
			},
			{
				path: "manage/assets/:id",
				element: <AssetDetailPage />,
			},
			{
				path: "manage/account",
				element: <AccountSettingManagementPage />,
			},
			{
				path: "manage/playlists/:id",
				element: <PlaylistDetailPage />,
			},
		],
	},
	{
		element: <PreviewLayout />,
		children: [
			{
				path: "manage/screens/:id/preview",
				element: (
					<div>
						<h1>Preview</h1>
					</div>
				),
			},
			{
				path: "manage/playlists/:id/preview",
				element: <PlaylistDetailPreview />,
			},
		],
	},
]);

const AppRouter = (_props: Props) => {
	return <RouterProvider router={routes} />;
};

export default AppRouter;
