export const dynamic = "force-dynamic";

import { Suspense } from "react";
import AboutInner from "./AboutInner";

export default function AboutPage() {
  return (
    <Suspense fallback={<div className="p-6 text-gray-600">Loading…</div>}>
      <AboutInner />
    </Suspense>
  );
}
