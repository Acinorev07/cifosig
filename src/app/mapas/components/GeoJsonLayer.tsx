"use client";

import { GeoJSON } from "react-leaflet";
import { useEffect, useState } from "react";

export default function RutaLayer() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/data/ruta/ruta.geojson")
      .then(res => res.json())
      .then((geojson) => {
        const fixedFeatures = geojson.features.flatMap((f: any) => {
          if (f.geometry.type === "GeometryCollection") {
            return f.geometry.geometries.map((g: any) => ({
              type: "Feature",
              geometry: g,
              properties: f.properties ?? {},
            }));
          }
          return f;
        });

        setData({
          type: "FeatureCollection",
          features: fixedFeatures,
        });
      });
  }, []);

  if (!data) return null;

  return (
    <GeoJSON
      data={data}
      style={{
        color: "red",
        weight: 4,
      }}
    />
  );
}
