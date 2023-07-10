import { defineConfig } from "astro/config"
import cloudflare from "@astrojs/cloudflare"
import tailwind from "@astrojs/tailwind"
import { loadEnv } from "vite"
import storyblok from "@storyblok/astro"
import basicSsl from "@vitejs/plugin-basic-ssl"
import solidJs from "@astrojs/solid-js"

const env = loadEnv("", process.cwd(), "")

// https://astro.build/config
export default defineConfig({
  integrations: [
    solidJs(),
    tailwind(),
    storyblok({
      accessToken: env.STORYBLOK_TOKEN,
      components: {
        "blog-post": "components/storyblok/Article",
        "article-page": "components/storyblok/Article",
        "article-overview-page": "components/storyblok/ArticleOverview",
        "faq-entry": "components/storyblok/FaqEntry",
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
  vite:
    env.HTTPS == "true"
      ? {
          plugins: [basicSsl()],
          server: {
            https: true,
          },
        }
      : {},
})
