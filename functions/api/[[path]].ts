import { json } from "../../src/lib/server/http";
// Catch-all so unknown /api/* routes return JSON rather than the SPA 404 page.
export const onRequest: PagesFunction = async () => json({ ok: false, error: "Not found." }, 404);
