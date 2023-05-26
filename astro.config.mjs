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
  // makes wrangler debugging possible
  // vite: {
  //   build: {
  //     minify: false,
  //   },
  // }
});
