export const validOrders = ["score_relevant", "score_popular", "published_at"] as readonly string[]
export const validSources = ["youtube", "twitter", "reddit", "news", "instagram", "tiktok"] as readonly string[]

export type FetchContentOrder = (typeof validOrders)[number]
export type FetchContentSource = (typeof validSources)[number]
export type FetchContentParams = {
  count?: number
  page?: number
  order?: FetchContentOrder
  since?: string
  source?: FetchContentSource
}

export type FetchCreatorsParams = {
  count?: number
  time?: string
  source?: FetchContentSource
}

export async function fetchCreators(params: FetchCreatorsParams) {
  const urlParams = new URLSearchParams({
    source: params.source || "",
    count: params.count?.toString() || "3",
    time: params.time || "3 months",
  })

  const response = await fetch(`https://api.stormgateworld.com/v0/creators?${urlParams.toString()}`)
  if (response.status !== 200) throw new Error(await response.text())
  const json = await response.json()
  return json.data
}

export async function fetchContent<S extends Content["source"][] = []>(sources: S, params: FetchContentParams = {}) {
  const urlParams = new URLSearchParams({
    source: params.source || "",
    count: params.count?.toString() || "100",
    page: params.page?.toString() || "1",
    order: params.order || "score_relevant",
    since: params.since || "",
  })

  if (sources.length > 0) {
    sources.forEach((s) => urlParams.append("sources[]", s))
  }

  const response = await fetch(`https://api.stormgateworld.com/v0/content?${urlParams.toString()}`)
  if (response.status !== 200) throw new Error(await response.text())
  const json = await response.json()
  const content = json.data as FilteredContentType<S[number]>[]
  return content
}

export type SourceData<Source extends string, T = undefined> = {
  id: number
  source: Source
  source_id: string
  metadata: T
  score: number
  title: string
  description: string
  url: string
  image_url: string
  author: string
  author_url: string
  author_image_url: string
  published_at: string
  updated_at: string
  created_at: string
}

export type TwitterData = {
  likes_count: number
  retweets_count: number
  replies_count: number
}

export type YoutubeData = {
  comments_count: number
  duration: number
  likes_count: number
  views_count: number
}

export type RedditData = {
  comments_count: number
  downvotes_count: number
  upvote_ratio: number
  upvotes_count: number
}

export type InstagramData = {
  comments_count: number
  likes_count: number
}

export type YoutubeContent = SourceData<"youtube", YoutubeData>
export type TwitterContent = SourceData<"twitter", TwitterData>
export type RedditContent = SourceData<"reddit", RedditData>
export type NewsContent = SourceData<"news">
export type InstagramContent = SourceData<"instagram", InstagramData>
export type TikTokContent = SourceData<"tiktok">
export type Content = YoutubeContent | TwitterContent | RedditContent | NewsContent | InstagramContent | TikTokContent

type FilteredContentType<T extends Content["source"]> = Extract<Content, { source: T }>
