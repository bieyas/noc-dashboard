import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  LayerGroup,
} from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { onuLocations } from "../data/onuLocations";
import { odpLocations } from "../data/odpLocations";
import { generateOnuIcon } from "../utils/generateOnuIcon";
import { generateOdpIcon } from "../utils/generateOdpIcon";

// ✅ Atasi bug default icon hilang
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL("leaflet/dist/images/marker-icon-2x.png", import.meta.url).href,
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).href,
  shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url).href,
});

// ✅ Pemetaan status ke warna
const statusColors = {
  online: "#10b981",     // hijau
  offline: "#ef4444",    // merah
  weak: "#facc15",       // kuning
  nonactive: "#9ca3af",  // abu-abu
};

// ✅ Icon kustom berdasarkan status
const getStatusIcon = (status) =>
    new Icon({
        iconUrl: generateOnuIcon(statusColors[status] || "#9ca3af"), // default abu-abu
    iconSize: [30, 40],
    iconAnchor: [15, 40],
    popupAnchor: [0, -30],
  });

export default function NetworkMap() {
  return (
    <MapContainer
      center={[-7.56055, 112.25700]} // ✅ Center peta awal
      zoom={15}
      scrollWheelZoom={true}
      className="h-[600px] w-full rounded-xl z-0"
    >
      <LayersControl position="topright">
        {/* Street Layer */}
        <LayersControl.BaseLayer checked name="Street View">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </LayersControl.BaseLayer>

        {/* Satellite Layer (Mapbox or ESRI) */}
        <LayersControl.BaseLayer name="Satelit View">
          <TileLayer
            attribution="Tiles &copy; Esri"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        </LayersControl.BaseLayer>
      </LayersControl>

<LayerGroup>
  {/* Marker ONU */}
  {onuLocations.map((onu) => (
    <Marker
      key={onu.id}
      position={[onu.lat, onu.lng]}
      icon={getStatusIcon(onu.status)}
    >
      <Popup>
        <strong>{onu.name}</strong> <br />
        Status: <span className="capitalize">{onu.status}</span>
      </Popup>
    </Marker>
  ))}

  {/* Marker ODP */}
  {odpLocations.map((odp) => (
    <Marker
      key={odp.id}
      position={[odp.lat, odp.lng]}
      icon={
        new Icon({
          iconUrl: generateOdpIcon(),
          iconSize: [28, 28],
          iconAnchor: [14, 28],
          popupAnchor: [0, -25],
        })
      }
    >
      <Popup>
        <strong>{odp.name}</strong><br />
        Tipe: ODP
      </Popup>
    </Marker>
  ))}
</LayerGroup>

    </MapContainer>
  );
}
