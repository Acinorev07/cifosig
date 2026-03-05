"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import  RutaLayers from "@/app/Map/[rutaId]/components/GeoJsonLayers";


// Fix para los íconos en Next.js
// delete (L.Icon.Default.prototype as unknown as { _getIconUrl: unknown })._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

export default function MapWidgets({ rutaId }: { rutaId: string }) {
  
   if (typeof window === "undefined") return null;
  return (
    <MapContainer
      center={[6.699, -72.732]} // Málaga, Santander
      zoom={13}
      style={{ height: "500px", width: "100%" }}
      whenReady={() => {
        console.log("Mapa listo");
       }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      
      <RutaLayers rutaId={rutaId}/>
     
    </MapContainer>
  );
}