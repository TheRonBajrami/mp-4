"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Weather } from "@/lib/types";


export default function About() {
  const sp = useSearchParams();
  const q = (sp.get("q") || "").trim();

  const [data, setData] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!q) return;
    let ignore = false;

    async function run() {
      try {
        setLoading(true);
        setErr(null);
        setData(null);
        const res = await fetch(`/api/weather?q=${encodeURIComponent(q)}`, { cache: "no-store" });
        const json = await res.json();
        if (!res.ok || json.error) throw new Error(json.error || "Failed to load weather");
        if (!ignore) setData(json);
      } catch (e: any) {
        if (!ignore) setErr(e?.message || "Network error");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    run();
    return () => { ignore = true; };
  }, [q]);

  if (!q) {
    return (
      <main className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <h1 className="text-3xl font-bold mb-4 text-gray-700">About this weather app</h1>
        <p className="text-gray-600 max-w-md text-center">
          Use the search on the home page first. Results will appear here.
        </p>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-50">
      {loading && <p className="text-gray-600">Loading...</p>}
      {err && <p className="text-red-600">{err}</p>}

      {data && (
        <>
          <h1 className="text-3xl font-bold mb-2 text-gray-700">
            {data.city}, {data.country}
          </h1>
          <p className="text-gray-600 capitalize mb-3">{data.desc || "N/A"}</p>
          {data.icon && (
            <img src={data.icon} alt={data.desc || "weather"} className="h-12 mb-2" />
          )}
          <div className="bg-white shadow p-6 rounded w-80 text-center text-gray-800">
            <p className="text-2xl font-bold">
              {data.tempC !== undefined ? Math.round(data.tempC) : "—"}°C
            </p>
            <p className="text-gray-600">
              Feels like {data.feelsLikeC !== undefined ? Math.round(data.feelsLikeC) : "—"}°C
            </p>
            <div className="text-sm text-gray-600 mt-2">
              <p>Humidity: {data.humidity ?? "—"}%</p>
              <p>Wind: {data.windKph ?? "—"} kph</p>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
