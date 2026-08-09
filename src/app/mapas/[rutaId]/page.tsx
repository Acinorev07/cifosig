
import ClientOnlyMaps from "./components/ClientOnlyMaps";



export default async function RutaId({ 
  params, 
  searchParams 
}: { params: { 
  rutaId: string }; 
  searchParams: Promise<{ name?: string }>; }) {
  const { rutaId } = await params;

  const resolvedSearchParams = await searchParams;
  const nombre = resolvedSearchParams.name || "Ruta";

  console.log("Nombre ruta:", nombre);

  return (
    <div className="min-h-screen bg-gray-100 p-4">

      {/* HEADER */}
      <div className="bg-white rounded-xl shadow p-4 mb-4">
        <h1 className="text-2xl font-bold text-gray-800">
          {nombre}
        </h1>
        <p className="text-gray-500 text-sm">
          Visualización geográfica de la ruta
        </p>
      </div>

      {/* MAPA */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="h-[500px] w-full">
          <ClientOnlyMaps rutaId={rutaId} />
        </div>
      </div>

    </div>
  );
}