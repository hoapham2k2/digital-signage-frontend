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
import NewScreenPage from "@/app/manage/screens/create/page";
import VirtualScreenDetailPreviewPage from "@/app/manage/screens/[id]/preview/VirtualScreenDetailPreviewPage";
import LoginPage from "@/app/login/LoginPage";
import ProtectedRoute from "./ProtectedRoutes";
import { AuthProvider } from "@/context/AuthContext";
import CreatePlaylistPage from "@/app/manage/playlists/create/CreatePlaylistPage";

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
				element: <ProtectedRoute />,
				children: [
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
						path: "manage/screens/new",
						element: <NewScreenPage />,
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
						path: "manage/playlists/create",
						element: <CreatePlaylistPage />,
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
		],
	},
	{
		element: <PreviewLayout />,
		children: [
			{
				path: "manage/screens/:id/preview",
				element: <VirtualScreenDetailPreviewPage />,
			},
			{
				path: "manage/playlists/:id/preview",
				element: <PlaylistDetailPreview />,
			},
			{
				path: "/login",
				element: <LoginPage />,
			},
		],
	},
]);

const AppRouter = () => {
	return (
		<AuthProvider>
			<RouterProvider router={routes} />
		</AuthProvider>
	);
};

export default AppRouter;
