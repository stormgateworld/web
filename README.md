# Stormgate World Website

The frontend for [Stormgate World](https://stormgateworld.com), a community website featuring leaderboards, players profiles, content, stats and more for the game [Stormgate](https://playstormgate.com/) by Frost Giant Studios.

## Stack

We're using Astro + Tailwind + SolidJS, writting in TypeScript. It's an easy to learn rendering framework optimized for static content and web pages. Styling is done through Tailwind.
For our interactice UX we use SolidJs, a signal based UI Framework that should be easy to adopt to people familiar with React or JSX. For the more complex components we rely on Kobalte, an headless UI Library, to ensure accessbility.

| Astro | SolidJS | Tailwind | Kobalte |
|-------|---------|----------|---------|
| ![Astro](https://astro.build/favicon.svg) | ![SolidJs](https://docs.astro.build/logos/solid.svg)  | ![Tailwind](https://docs.astro.build/logos/tailwind.svg) | ![Kobalte](https://kobalte.dev/favicon-32x32.png) | 
| Web Framework | UI Framework | CSS Utilties | A11y Components | 
| [Docs](https://astro.build/) | [Docs](https://docs.solidjs.com/) | [Docs](https://tailwindcss.com/) | [Docs](https://kobalte.dev/docs/core/overview/introduction) |

## Architecture
This project uses a so called Island Based architecture, or Multi Page App. In other words, all routes are a single response (no client side routing or SPA), where some areas of the page can be interactive components or widgets. No data, complex processing or storage happens in this project. Instead, we directly consume the [Stormgate World API](https://stormgateworld.com/api/) ([docs](https://api.stormgateworld.com/swagger-ui/#/Leaderboards/getLeaderboard)) and add more endpoints there if needed (due to the nature of the integration with Frost Giant Studios the API project source code is private). This architecture also means you can contributo simple pages without needing to know SolidJs. 

A fully typed version of the API is included as a lib in the project and can be used like below
```ts
import { LeaderboardOrder, LeaderboardsApi, Race} from "../lib/api"

const leaderboard = await LeaderboardsApi.getLeaderboard({
   order: LeaderboardOrder.MMR,
   race: Race.INFERNALS,
   count: 30
})
```


## Getting Started
Make sure to install [PNPM](https://pnpm.io/) and [Node](https://nodejs.org/en) (v18.0+). Pull the project and run:

- `pnpm install` to install dependencies
- `pnpm dev` to run the project locally


## Contributing
Contributors are welcome! Take a look at the issues and feel free to make PRs. Project discussion currently is hosted in the [Stormgate Playtest Discord](https://discord.com/channels/1101590942076653660/1202683757707010128).
