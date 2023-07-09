import { defineConfig } from "astro/config"
import cloudflare from "@astrojs/cloudflare"
import tailwind from "@astrojs/tailwind"
import { loadEnv } from "vite"
import storyblok from "@storyblok/astro"

import solidJs from "@astrojs/solid-js"

const env = loadEnv("", process.cwd(), "STORYBLOK")

// https://astro.build/config
export default defineConfig({
  integrations: [
    solidJs(),
    tailwind(),
    storyblok({
      accessToken: env.STORYBLOK_TOKEN,
      components: {
        "article-page": "components/storyblok/Article",
        "article-overview-page": "components/storyblok/ArticleOverview",
      },
      apiOptions: {
        region: "eu",
      },
    }),
  ],
  output: "hybrid",
  adapter: cloudflare({
    mode: "directory",
  }),
  // makes wrangler debugging possible
  // vite: {
  //   build: {
  //     minify: false,
  //   },
  // }
})
