import { z, defineCollection } from "astro:content";
const hypeCollection = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string(),
        thumbnail: z.string().optional(),
        url: z.string().optional(),
        publisher: z.string().optional(),
        date: z.date(),
    }),
});

const websitesCollection = defineCollection({
    schema: z.object({
        title: z.string(),
        subtitle: z.string(),
        icon: z.string(),
        url: z.string(),
    }),
});

const videosCollection = defineCollection({
    schema: z.object({
        url: z.string().url(),
        title: z.string(),
        thumbnail: z.string().url(),
        author: z.string(),
        author_url: z.string().url(),
        author_avatar_url: z.string().url().optional(),
        date: z.date(),
        tags: z.array(z.string()),
        youtube_id: z.string(),
    }),
});

export const collections = {
    hype: hypeCollection,
    websites: websitesCollection,
    videos: videosCollection,
};
