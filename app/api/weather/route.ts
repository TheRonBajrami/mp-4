import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

if (!q) {
  return NextResponse.json({ error: "No city provided" }, { status: 400 });
}
  const key = process.env.WEATHER_API_KEY;

  if (!key) {
    return NextResponse.json({ error: "Missing WEATHER_API_KEY" }, { status: 500 });
  }

  try {
    const url = `http://api.weatherstack.com/current?access_key=${key}&query=${encodeURIComponent(
      q
    )}&units=m`;

    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {

      return NextResponse.json({ error: "fetch failed" }, { status: res.status });
    }

    const raw = await res.json();

    if ((raw as any)?.success === false) {
      return NextResponse.json({ error: raw.error?.info || "API error" }, { status: 400 });
    }

    const data = {
      city: raw?.location?.name,
      country: raw?.location?.country,
      tempC: raw?.current?.temperature,
      feelsLikeC: raw?.current?.feelslike,
      desc: raw?.current?.weather_descriptions?.[0],
      icon: raw?.current?.weather_icons?.[0],
      humidity: raw?.current?.humidity,
      windKph: raw?.current?.wind_speed,
    };

    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

