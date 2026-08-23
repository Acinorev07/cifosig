// src/app/mapas/[rutaId]/components/ClientOnlyMaps.tsx

"use client";

import { useEffect, useState } from "react";
// import MapWidgets from "./MapWidgets";

import dynamic from "next/dynamic";

const MapWidgets = dynamic(() => import("./MapWidgets"), {
  ssr: false,
});

export default function ClientOnlyMaps({ geojson, fotosRuta }: { geojson?: string, fotosRuta?:string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <MapWidgets geojson={geojson} fotosRuta={fotosRuta}/>;
}