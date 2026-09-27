"use client";

// import MapWidgets from "@/components/mapas/MapWidget";
import { useEffect, useState } from "react";
// import MapWidgets from "./MapWidgets";

import dynamic from "next/dynamic";

const MapWidgets = dynamic(() => import("@/components/mapas/MapWidget"), {
  ssr: false,
});

export default function ClientOnlyMap({ geojson, fotosRuta }: { geojson?: string, fotosRuta?:string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <MapWidgets geojson={geojson} fotosRuta={fotosRuta}/>;
}