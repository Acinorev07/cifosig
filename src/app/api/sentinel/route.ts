import { NextResponse } from "next/server";

export async function GET() {

    try {

        // =========================
        // 1. OBTENER TOKEN
        // =========================

        const auth = Buffer.from(
            `${process.env.SENTINEL_CLIENT_ID}:${process.env.SENTINEL_CLIENT_SECRET}`
        ).toString("base64");

        const tokenResponse = await fetch(
            "https://services.sentinel-hub.com/oauth/token",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Basic ${auth}`,
                },
                body: "grant_type=client_credentials",
            }
        );

        const tokenData = await tokenResponse.json();

        const accessToken = tokenData.access_token;

        // =========================
        // 2. PEDIR IMAGEN
        // =========================

        const imageResponse = await fetch(
            "https://services.sentinel-hub.com/api/v1/process",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    input: {
                        bounds: {
                            bbox: [
                                -73.15,
                                6.95,
                                -72.95,
                                7.15
                            ],
                            properties: {
                                crs: "http://www.opengis.net/def/crs/EPSG/0/4326"
                            }
                        },
                        data: [
                            {
                                type: "sentinel-2-l2a",
                                dataFilter: {
                                    timeRange: {
                                        from: "2025-01-01T00:00:00Z",
                                        to: "2025-12-31T23:59:59Z"
                                    },
                                    maxCloudCoverage: 20
                                }
                            }
                        ]
                    },

                    output: {
                        width: 512,
                        height: 512,
                        responses: [
                            {
                                identifier: "default",
                                format: {
                                    type: "image/jpeg"
                                }
                            }
                        ]
                    },

                    evalscript: `
                        //VERSION=3

                        function setup() {
                            return {
                                input: ["B02", "B03", "B04"],
                                output: { bands: 3 }
                            };
                        }

                        function evaluatePixel(sample) {
                            return [
                                2.5 * sample.B04,
                                2.5 * sample.B03,
                                2.5 * sample.B02
                            ];
                        }
                    `
                }),
            }
        );

        // =========================
        // 3. CONVERTIR A BASE64
        // =========================

        const arrayBuffer = await imageResponse.arrayBuffer();

        const base64 = Buffer.from(arrayBuffer).toString("base64");

        const image = `data:image/jpeg;base64,${base64}`;

        return NextResponse.json({
            image
        });

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            { error: "Error obteniendo imagen" },
            { status: 500 }
        );
    }
}