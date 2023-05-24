import { drizzle } from "drizzle-orm/d1";

import { getRuntime } from "@astrojs/cloudflare/runtime";

export async function getDatabase(request: Request) {
  const runtime = getRuntime(request) as any;
  if (import.meta.env.DEV) return (await import("./dev")).devDatabase();
  return drizzle(runtime.env.DB);
}
