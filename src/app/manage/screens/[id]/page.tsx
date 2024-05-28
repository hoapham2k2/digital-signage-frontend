import HistoryBackButton from "@/components/buttons/HistoryBackButton";
import { Button } from "@/components/ui/button";

import { Content, Group, Playlist, Screen } from "@/lib/types";
import { useNavigate, useParams } from "react-router-dom";
import PreviewScreenSection from "./components/PreviewScreenSection";
import PlaylistForScreenTable from "./components/PlaylistForScreenTable";
import AppBadge from "@/components/buttons/AppBadge";
import { cn } from "@/lib/utils";
import { QRCodeSVG } from "qrcode.react";
import { useQuery } from "react-query";
import { fetchGroupByIds } from "@/apis/groups";
import { fetchPlaylistByGroupIds } from "@/apis/playlists";
import { fetchScreenById } from "@/apis/screens";
import { fetchContentsByPlaylistIds } from "@/apis/contents";

type Props = NonNullable<unknown>;

const ScreenDetailPage = (_props: Props) => {
	const { id } = useParams();

	const { data: screen } = useQuery<Screen>({
		queryKey: ["screens", id],
		queryFn: () => {
			return fetchScreenById(id || "");
		},
		enabled: !!id,
	});
	const { data: groupsBelongToScreen } = useQuery<Group[]>({
		queryKey: ["groups", screen?.groups],
		queryFn: () => {
			return fetchGroupByIds(screen?.groups || []);
		},
		enabled: !!screen,
	});

	const { data: playlistsForScreen } = useQuery<Playlist[]>({
		queryKey: ["playlists", groupsBelongToScreen],
		queryFn: () => {
			return fetchPlaylistByGroupIds(
				groupsBelongToScreen?.map((group) => group.id || "") || []
			);
		},
		enabled: !!groupsBelongToScreen,
	});

	const { data: contentsBelongToPlaylists } = useQuery<Content[]>({
		queryKey: ["contents", playlistsForScreen],
		queryFn: () => {
			return fetchContentsByPlaylistIds(
				playlistsForScreen?.map((playlist) => playlist.id || "") || []
			);
		},
		enabled: !!playlistsForScreen,
	});

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
							Current playlist{" "}
							{contentsBelongToPlaylists?.reduce(
								(acc, content) => acc + content.duration,
								0
							) || 0}{" "}
							sec
						</h2>
						{screen && (
							<PlaylistForScreenTable
								playlists={playlistsForScreen || []}
								screen={screen}
							/>
						)}
					</div>
					<div className='w-1/2'>
						<div className='flex flex-row gap-4'>
							<h3>Status</h3>
							{groupsBelongToScreen &&
								// (
								// 	<AppBadge
								// 		name={`${groupsBelongToScreen.map((group) =>
								// 			group.name.includes("Virtual") ? "Virtual Screen" : null
								// 		)}`.replace(/,/g, "")}
								// 	/>
								// )
								groupsBelongToScreen.map((group) => (
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
						<div>
							<h3>Group Labels</h3>
							<div className='flex flex-row gap-2'>
								{groupsBelongToScreen &&
									groupsBelongToScreen.map((group) => (
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
