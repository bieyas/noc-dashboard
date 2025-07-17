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
import { useRef, useState, useEffect } from "react";
import L from "leaflet";
import { onuLocations } from "../data/onuLocations";
import { odpLocations } from "../data/odpLocations";
import { generateOnuIcon } from "../utils/generateOnuIcon";
import { generateOdpIcon } from "../utils/generateOdpIcon";
import OdpPopup from "./OdpPopup";
import OnuPopup from "./OnuPopup";


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

export default function NetworkMap({ fullScreen = false }) {
  const mapRef = useRef();
  const [searchTerm, setSearchTerm] = useState("");
  const [matchedOnu, setMatchedOnu] = useState(null);

  // Saat keyword berubah → cari match
useEffect(() => {
  if (!searchTerm) return;
  const found = onuLocations.find((onu) =>
    onu.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (found && mapRef.current) {
    mapRef.current.flyTo([found.lat, found.lng], 15, { duration: 1 });
    setMatchedOnu(found);
  };
}, [searchTerm]);

  // Jika tidak ada match, reset matchedOnu
useEffect(() => {
  if (!matchedOnu || !mapRef.current) return;


  // Buat layer popup baru dan buka
  const popup = L.popup()
    .setLatLng([matchedOnu.lat, matchedOnu.lng])
    .setContent(`<strong>${matchedOnu.name}</strong><br/>Status: ${matchedOnu.status}`);
  popup.openOn(mapRef.current);
}, [matchedOnu]);

  
  return (
    <MapContainer
      ref={mapRef}
      center={[-7.56055, 112.25700]} // ✅ Center peta awal
      zoom={15}
      scrollWheelZoom={true}
      className={`${fullScreen ? "h-full w-full" : "h-full w-full"} rounded-sm z-0`}
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
        <LayersControl.BaseLayer name="Google Satelit">
          <TileLayer
            attribution='&copy; <a href="https://www.google.com/intl/en-US_US/help/terms_maps.html">Google Maps</a>'
            url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
          />
        </LayersControl.BaseLayer>
      </LayersControl>

      {/* 🔍 Search Input */}
      <div className="absolute top-4 left-12 z-[999]">
        <input
          type="text"
          placeholder="Cari pelanggan..."
          className="px-3 py-1 rounded border border-zinc-700 bg-zinc-900 text-white text-sm shadow-lg w-60 focus:outline-none focus:ring focus:ring-green-500"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>



      <LayerGroup>
        {/* Marker ONU */}
        {onuLocations.map((onu) => (
          <Marker
            key={onu.id}
            position={[onu.lat, onu.lng]}
            icon={getStatusIcon(onu.status)}
          >
            <Popup>
              <OnuPopup onu={onu} />
            </Popup>
          </Marker>
        ))}
        </LayerGroup>

        {/* Marker ODP */}
      <LayerGroup>
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
              <OdpPopup odp={odp} />
            </Popup>
          </Marker>
        ))}
      </LayerGroup>

    </MapContainer>
  );
}
