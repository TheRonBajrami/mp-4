"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [city, setCity] = useState("");
  const router = useRouter();

  return ( 

    <main className="h-screen bg-blue-50 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">Weather Forecast</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const q = city.trim();
          if (!q) return;
          router.push(`/about?q=${encodeURIComponent(q)}`);
        }}
        className="flex gap-2 mb-6"
      >
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border rounded px-3 py-2 w-64 text-black"
          placeholder="Enter city (e.g., Boston)"
          aria-label="City"
        />
        <button
          type="submit"
          className="bg-blue-700 text-white active:text-black rounded px-4 py-2"
        >
          Search
        </button>
      </form>
    </main>
  );
}

