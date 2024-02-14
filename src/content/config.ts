import { z, defineCollection, reference } from "astro:content"

const websitesCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    icon: z.string(),
    url: z.string(),
  }),
})

const playersCollection = defineCollection({
  schema: z.object({
    playerId: z.string(),
    name: z.string(),
    country: z.string().optional(),
    earnings: z.number().optional(),
    liquipediaUrl: z.string().url().optional(),
  }),
})

const playerBadgesCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      icon: image(),
      playerIds: z.array(z.string()),
    }),
})

export const collections = {
  websites: websitesCollection,
  players: playersCollection,
  badges: playerBadgesCollection,
}
