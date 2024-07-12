import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
import { useQuery } from "react-query";
import { Player } from "@/types";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { fetchScreens } from "@/apis/screens";

export const StatusMapLeaf: React.FC = () => {
	const [positions] = useState<[number, number][]>([]);
	const { user } = useAuth();
	const {
		data: screens,
		isError,
		isLoading,
	} = useQuery<Player[]>({
		queryKey: ["screen"],
		queryFn: () => fetchScreens(user?.id as string),
		enabled: !!user,
		// onSuccess: (data) => {
		// 	toast({
		// 		title: "Screens loaded",
		// 		description: JSON.stringify(data),
		// 	});
		// },
	});

	useEffect(() => {
		if (!screens) return;

		const fetchPositions = async () => {
			try {
				await Promise.all(
					screens
						.filter(
							(screen) =>
								screen.ip_address !== null &&
								screen.ip_address !== "" &&
								screen.ip_address !== undefined
						)
						.map((screen) =>
							fetch(`https://api.ipbase.com/v1/json/${screen.ip_address}`)
						)
				);
			} catch (error) {
				console.error("Error fetching positions:", error);
			}
		};

		fetchPositions();
	}, [screens]);

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error loading screens</div>;

	return (
		<div className='shadow-lg'>
			<MapContainer
				center={[10.797810960226563, 106.71887700397427] as LatLngExpression}
				zoom={11}
				className='h-96 w-full rounded-md'
				scrollWheelZoom={false}>
				<TileLayer
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				/>
				{positions.map((position, index) => (
					<Marker key={index} position={position}>
						<Popup>
							A pretty CSS3 popup. <br /> Easily customizable.
						</Popup>
					</Marker>
				))}

				<Marker position={[10.873275056924152, 106.80231783774153]}>
					<Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker>
			</MapContainer>
		</div>
	);
};

export default StatusMapLeaf;
