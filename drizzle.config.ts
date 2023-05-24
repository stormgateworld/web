import type { Config } from "drizzle-kit";

export default {
  schema: "./db/schema.ts",
  connectionString: "sqlite.db",
  out: "./db/migrations",
} satisfies Config;
