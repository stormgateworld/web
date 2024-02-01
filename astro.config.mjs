import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import solidJs from "@astrojs/solid-js";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [solidJs(), tailwind()],
  output: "hybrid",
  adapter: node({
    mode: "standalone"
  }),
  markdown: {
    shikiConfig: { theme: "aurora-x" }
  }
});