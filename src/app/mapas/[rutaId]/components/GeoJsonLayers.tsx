// src/app/mapas/[rutaId]/components/GeoJsonLayers.tsx

"use client";

import { GeoJSON } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import { Polyline } from "react-leaflet";

function extraerImagenes(html: string): string[]{

  if (!html) return [];

  const regex = /src="([^"]+)"/g;
  const matches = [];
  let match;

  while ((match = regex.exec(html)) != null){
    matches.push(match[1]);
  }

  return matches;


}


const obtenerCoordenadas = (features: any[]) => {
  return features
    .filter(f => f.geometry.type === "Point")
    .sort((a, b) => new Date(a.properties.timestamp).getTime() - new Date(b.properties.timestamp).getTime())
    .map(f => [
      f.geometry.coordinates[1],
      f.geometry.coordinates[0]
    ]);
};

export default function RutaLayer({ geojson, fotosRuta }: { geojson?: string, fotosRuta?:string }) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if(!geojson) return

    fetch(geojson)
      .then(res => res.json())
      .then((geojsonData) => {
        const fixedFeatures = geojsonData.features.flatMap((f: any) => {
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
  }, [geojson]);

  if (!data) return null;

  const coords = data ? obtenerCoordenadas(data.features) : [];

  return (
    <>
      <GeoJSON
        data={data}
        // style={{
        //   color: "red",
        //   weight: 4,
        // }
        pointToLayer = {(feature, latlng) => {
          return L.marker(latlng);
        }}
        onEachFeature={(feature, layer)=>{
          const props = feature.properties;

          const imagenes = extraerImagenes(props.pdfmaps_photos);
          let contenido = `<b>${props.name}</b><br/>`;

          imagenes.forEach((img: string) => {
            const rutaLimpia = img.trim().replace(/\s+/g, " ");

            const nombreArchivo = rutaLimpia.replace("images/", "");

            const rutaFinal = `${fotosRuta}/${nombreArchivo}`;

            console.log("ruta final:", rutaFinal);

            contenido += `<img src="${rutaFinal}" width="200"/><br/>`;
          });

          layer.bindPopup(contenido);
        }}
      />
      {coords.length > 0 && (
        <Polyline
          positions={coords}
          pathOptions={{ color: "red", weight: 4 }}
        />
      )}
    </>
  );
}
