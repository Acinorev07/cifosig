export async function GET(request:Request) {

  // const clientId = process.env.PLANET_CLIENT_ID!;
  const clientSecret = process.env.PLANET_CLIENT_SECRET!;
  const {searchParams}= new URL(request.url)

  const width = searchParams.get("width") || "512";
  const itemId = searchParams.get("itemId") || "20160223_174714_0c72";

  // console.log("client-id: ",clientId)
  console.log("client secret: ",clientSecret)
  const auth = Buffer
  .from(`${clientSecret}:`)
  .toString("base64");

  // const body = new URLSearchParams({
  //   // client_id: clientId!,
  //   client_secret: clientSecret!,
  //   // grant_type: 'client_credentials',
  // });

  const response = await fetch(
    `https://tiles.planet.com/data/v1/item-types/PSScene/items/${itemId}/thumb?api_key=${clientSecret}&width=${width}`
  );

  const imageBuffer = await response.arrayBuffer();

  return new Response(imageBuffer, {
    headers: {
      "Content-Type": "image/jpeg",
    },
  });
}