"use client";
import { useEffect, useState } from "react";

type Loc = { id: string; location_name: string; location_type: string; city: string | null; state: string | null; country: string; coming_soon: boolean };

/** Live locator list. Only mounted when flags.locatorEnabled is true. */
export default function LocationsClient() {
  const [locs, setLocs] = useState<Loc[] | null>(null);
  useEffect(() => {
    let alive = true;
    fetch("/api/locations").then((r) => r.json()).then((d: { locations?: Loc[] }) => alive && setLocs(d.locations ?? [])).catch(() => alive && setLocs([]));
    return () => { alive = false; };
  }, []);
  if (locs === null) return <p role="status" className="text-ink-soft">Loading locations…</p>;
  if (!locs.length) return <p className="text-ink-soft">Locations will be listed here as they launch.</p>;
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {locs.map((l) => (
        <li key={l.id} className="border border-sage/50 bg-[#FBF8F1]/80 p-6">
          <h3 className="text-2xl">{l.location_name}</h3>
          <p className="mt-1 text-sm capitalize text-ink-soft">{l.location_type.replace("-", " ")}</p>
          <p className="mt-2 text-sm">{[l.city, l.state, l.country].filter(Boolean).join(", ")}</p>
          {l.coming_soon && <p className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-deep-sage">Coming soon</p>}
        </li>
      ))}
    </ul>
  );
}
