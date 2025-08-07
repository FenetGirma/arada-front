import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const customIcon = new L.Icon({
  iconUrl: "/marker-icon.png", // Make sure this file is in your public/ directory
  iconSize: [18, 30],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

type Challenge = {
  id: string | number;
  latitude: number;
  longitude: number;
  title: string;
  userId: string | number;
};

interface ImpactMapProps {
  challenges: Challenge[];
}

const ImpactMap: React.FC<ImpactMapProps> = ({ challenges }) => {
  return (
    <MapContainer
      center={[9.145, 40.4897]}
      scrollWheelZoom={true}
      zoom={6}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {challenges.map((item) => (
        <Marker
          key={item.id}
          icon={customIcon}
          position={[item.latitude, item.longitude]}
        >
          <map></map>
          <Popup>
            <strong>{item.title}</strong>
            <br />
            Contributed by user {item.userId}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
export default ImpactMap;
