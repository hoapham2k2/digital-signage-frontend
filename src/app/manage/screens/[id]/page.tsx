import HistoryBackButton from "@/components/buttons/HistoryBackButton";
import { Button } from "@/components/ui/button";
import { appStore } from "@/lib/stores/app-store";
import { Content, Group, Playlist, Screen } from "@/lib/types";
import { useNavigate, useParams } from "react-router-dom";
import PreviewScreenSection from "./components/PreviewScreenSection";
import PlaylistForScreenTable from "./components/PlaylistForScreenTable";
import AppBadge from "@/components/buttons/AppBadge";
import { cn } from "@/lib/utils";
import { QRCodeSVG } from "qrcode.react";

type Props = {};

const ScreenDetailPage = (_props: Props) => {
	const { id } = useParams();
	const screen = appStore((state) =>
		state.screens.find((screen: Screen) => screen.id === id)
	);
	const groupsBelongToScreen: Group[] = appStore(
		(state) => state.groups
	).filter((group) => screen?.groups.includes(group.id));

	const playlists: Playlist[] = appStore((state) => state.playlists);

	const playlistsForScreen: Playlist[] = playlists.filter((playlist) =>
		playlist.groups.some((group) => screen?.groups.includes(group))
	);
	const contentsBelongToPlaylists: Content[] = appStore((state) =>
		state.contents.filter((content) =>
			playlistsForScreen.some((playlist) =>
				playlist.contents.includes(content.id)
			)
		)
	);
	const sumOfPlaylistDuration = contentsBelongToPlaylists.reduce(
		(acc, content) => acc + content.duration,
		0
	);

	const navigate = useNavigate();
	return (
		<div>
			<div className='flex flex-row justify-between items-center'>
				<div className='flex flex-row gap-4 items-center'>
					<HistoryBackButton />
					<h1 className='text-2xl'>{screen?.name}</h1>
				</div>
				<div className='flex flex-row gap-4'>
					<Button onClick={() => navigate(`/manage/screens/${id}/edit`)}>
						Edit
					</Button>
				</div>
			</div>
			<div className='w-full bg-white p-4 rounded-md border border-gray-300 mt-4'>
				<div className='flex flex-row gap-4'>
					<div className='w-1/2'>
						<PreviewScreenSection />
						<h2 className='text-lg mt-4'>
							Current playlist ({sumOfPlaylistDuration} sec)
						</h2>
						<PlaylistForScreenTable />
					</div>
					<div className='w-1/2'>
						<div className='flex flex-row gap-4'>
							<h3>Status</h3>
							<AppBadge
								name={`${groupsBelongToScreen.map((group) =>
									group.name.includes("Virtual") ? "Virtual Screen" : null
								)}`.replace(/,/g, "")}
							/>
						</div>
						<div>
							<h3>Group Labels</h3>
							<div className='flex flex-row gap-2'>
								{groupsBelongToScreen.map((group) => (
									<AppBadge
										key={group.id}
										name={group.name}
										variant={"outline"}
										className={cn({
											"bg-gray-300": group.name.includes("Virtual"),
										})}
									/>
								))}
							</div>
						</div>

						<div>
							<h3>QR Code</h3>
							<QRCodeSVG
								className='w-32 h-auto'
								value={`${window.location.href}/preview`}
							/>

							<Button
								onClick={(_e) => {
									navigator.clipboard.writeText(
										`${window.location.href}/preview`
									);
								}}>
								Copy link to clipboard
							</Button>
						</div>

						<div>
							<h3>
								Tip: You can share the link to your virtual screen with your
								collegues or preview it on a different device (such as your
								phone or tablet).
							</h3>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ScreenDetailPage;
