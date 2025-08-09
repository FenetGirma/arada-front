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
  id: string;
  title: string;
  description: string;
  tags?: string[];
  imageUrl?: string;
  createdBy?: {
    id: number;
    name?: string;
  };
  location: { latitude: number; longitude: number }; // support both string & parsed
  upvotes?: number;
  points?: number;
  solutions?: any[];
  status?: string;
  date?: string;
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
      // In ImpactMap.tsx
      {challenges.map((item) =>
        item.location &&
        typeof item.location !== "string" &&
        item.location.latitude &&
        item.location.longitude ? (
          <Marker
            key={item.id}
            icon={customIcon}
            position={[item.location.latitude, item.location.longitude]}
          >
            <Popup>
              <strong>{item.title}</strong>
              <br />
              Contributed by user {item.createdBy?.id}
            </Popup>
          </Marker>
        ) : null
      )}
    </MapContainer>  );
};
export default ImpactMap;
