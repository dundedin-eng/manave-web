import { flags } from "../../src/data/siteConfig";
import { json } from "../../src/lib/server/http";
import { selectPublic } from "../../src/lib/server/supabase";
import type { Env } from "../../src/lib/server/env";

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  if (!flags.locatorEnabled) return json({ ok: true, locations: [] }, 200, { "cache-control": "public, max-age=60" });
  try {
    const locations = await selectPublic(
      env,
      "locations",
      "select=id,location_name,location_type,city,state,country,coming_soon&order=state.asc,city.asc,location_name.asc&limit=500",
    );
    return json({ ok: true, locations }, 200, { "cache-control": "public, max-age=300, s-maxage=300" });
  } catch (e) {
    console.error(e);
    return json({ ok: false, locations: [] }, 502);
  }
};
