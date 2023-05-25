import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import tailwind from "@astrojs/tailwind";

import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  integrations: [solidJs(), tailwind()],
  output: "hybrid",
  adapter: cloudflare({
    mode: "directory"
  }),
  experimental: {
    hybridOutput: true
  },
  vite: {
    build: {
      minify: false, // makes wrangler debugging possible
    },
  }
});
