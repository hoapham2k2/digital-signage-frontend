import HistoryBackButton from "@/components/buttons/HistoryBackButton";
import { Button } from "@/components/ui/button";
import {  Group, Screen, ScreenType } from "@/types/index";
import { Link, useParams } from "react-router-dom";
import PreviewScreenSection from "./components/PreviewScreenSection";
import AppBadge from "@/components/buttons/AppBadge";
import { QRCodeSVG } from "qrcode.react";
import { useQuery } from "react-query";
import {  fetchGroupsByScreenId } from "@/apis/groups";
import { fetchScreenById } from "@/apis/screens";
import { Card, CardHeader } from "@/components/ui/card";

type Props = NonNullable<unknown>;

const ScreenDetailPage = (_props: Props) => {
	const { id } = useParams();

	const {
		data: screen,
		isLoading: isFetchCurrenLoading,
		isError: isFetchCurrentScreenError,
		isSuccess: isFetchCurrentScreenSuccess,
	} = useQuery<Screen>({
		queryKey: ["screens", id],
		queryFn: () => {
			return fetchScreenById(id || "");
		},
		enabled: !!id,
	});
	const { data: groupsBelongToScreen } = useQuery<Group[]>({
		queryKey: ["groups", screen?.playerLabels],
		queryFn: () => {
			return fetchGroupsByScreenId({ screenId: id ?? "" });
		},
		enabled: !!id,
	});

	if (isFetchCurrenLoading) return <div>Loading...</div>;
	if (isFetchCurrentScreenError) return <div>Error </div>;
	if (isFetchCurrentScreenSuccess)
		return (
			<div>
				<div className='flex flex-row justify-between items-center'>
					<div className='flex flex-row gap-4 items-center'>
						<HistoryBackButton />
						<h1 className='text-2xl'>{screen?.name}</h1>
					</div>
					<div className='flex flex-row gap-4'>
						<Link to={`/manage/screens/${id}/edit`}>
							<Button>Edit</Button>
						</Link>
					</div>
				</div>
				<Card className='w-full mt-2'>
					<CardHeader className='flex flex-row gap-4'>
						<div className='w-1/2'>
							<PreviewScreenSection />
						</div>
						<div className='w-1/2 flex flex-col gap-2'>
							<div className='flex flex-row justify-between'>
								<h6>Status</h6>
								<AppBadge name={"Virtual"} />
							</div>
							<div className='flex flex-row justify-between'>
								<h6>Group Labels</h6>
								<div className='flex flex-row justify-between'>
									{groupsBelongToScreen &&
										groupsBelongToScreen.map((group) => (
											<AppBadge
												key={group.id}
												name={group.name}
												variant={"outline"}
											/>
										))}
								</div>
							</div>

							<div className='flex flex-row justify-between'>
								<h6>QR Code</h6>
								<div className='w-1/3 flex flex-col gap-2'>
									<QRCodeSVG
										className='w-full h-auto'
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
							</div>

							<p className='text-sm text-gray-400'>
								Tip: You can share the link to your virtual screen with your
								collegues or preview it on a different device (such as your
								phone or tablet).
							</p>
						</div>
					</CardHeader>
				</Card>
			</div>
		);
};

export default ScreenDetailPage;
