import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLng, LatLngExpression } from "leaflet";
import { useQuery } from "react-query";
import { Screen } from "@/types";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { fetchScreens } from "@/apis/screens";
import { useToast } from "@/components/ui/use-toast";

export const StatusMapLeaf: React.FC = () => {
	const [positions, setPositions] = useState<[number, number][]>([]);
	const { user } = useAuth();
	const { toast } = useToast();
	const {
		data: screens,
		isError,
		isLoading,
	} = useQuery<Screen[]>({
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
				const responses = await Promise.all(
					screens
						.filter((screen) => screen.ipAddress !== null)
						.map((screen) =>
							fetch(`https://api.ipbase.com/v1/json/${screen.ipAddress}`)
						)
				);
				toast({
					title: "Fetch positions",
					description: `${JSON.stringify(responses)}`,
				});
			} catch (error) {
				console.error("Error fetching positions:", error);
			}
		};

		fetchPositions();
	}, [screens]);

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error loading screens</div>;

	return (
		<div>
			<MapContainer
				center={[51.505, -0.09] as LatLngExpression}
				zoom={13}
				className='h-96 w-full rounded-md'
				scrollWheelZoom={true}>
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
			</MapContainer>
		</div>
	);
};

export default StatusMapLeaf;
