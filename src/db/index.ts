import { drizzle } from "drizzle-orm/d1";

import { getRuntime } from "@astrojs/cloudflare/runtime";

export async function getDatabase(request: Request) {
  const runtime = getRuntime(request) as any;

  if (import.meta.env.DEV) {
    console.log('using dev db')
    return (await import("./dev")).devDatabase()
  } else {
    console.log('using cf db')
    console.log('db', runtime.env.DB)
    return drizzle(runtime.env.DB);
  }
}
