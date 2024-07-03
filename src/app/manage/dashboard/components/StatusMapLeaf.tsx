import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
export const StatusMapLeaf: React.FC = () => {
	const positons: LatLngExpression[] = [
		[51.505, -0.09],
		[51.51, -0.1],
		[51.52, -0.08],
	];
	return (
		<MapContainer
			center={[51.505, -0.09]}
			zoom={13}
			className='h-96 w-full rounded-md'
			scrollWheelZoom={true}>
			<TileLayer
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">
				OpenStreetMap</a> contributors'
			/>
			{positons.map((position, index) => (
				<Marker key={index} position={position}>
					<Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker>
			))}
		</MapContainer>
	);
};

export default StatusMapLeaf;
