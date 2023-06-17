export type FetchContentOrder = "score" | "published_at";
export type FetchContentParams = {
  count?: number;
  page?: number;
  order?: FetchContentOrder;
  since?: string;
  source?: string;
};

export async function fetchContent<S extends Content["source"][] = []>(sources: S, params: FetchContentParams = {}) {
  const urlParams = new URLSearchParams({
    count: params.count?.toString() || "100",
    page: params.page?.toString() || "1",
    order: params.order || "score",
    since: params.since || "",
  });

  if (sources.length > 0) {
    sources.forEach((s) => urlParams.append("sources[]", s));
  }

  const request = await fetch(`https://api.stormgateworld.com/v0/content?${urlParams.toString()}`);
  const response = await request.json();
  const content = response.data as FilteredContentType<S[number]>[];
  return content;
}

export type SourceData<Source extends string, T = undefined> = {
  id: number;
  source: Source;
  source_id: string;
  metadata: T;
  score: number;
  title: string;
  description: string;
  url: string;
  image_url: string;
  author: string;
  author_url: string;
  author_image_url: string;
  published_at: string;
  updated_at: string;
  created_at: string;
};

export type TwitterData = {
  likes_count: number;
  retweets_count: number;
  replies_count: number;
};

export type YoutubeData = {
  comments_count: number;
  duration: number;
  likes_count: number;
  views_count: number;
};

export type RedditData = {
  comments_count: number;
  downvotes_count: number;
  upvote_ratio: number;
  upvotes_count: number;
};

export type InstagramData = {
  comments_count: number;
  likes_count: number;
};

export type YoutubeContent = SourceData<"youtube", YoutubeData>;
export type TwitterContent = SourceData<"twitter", TwitterData>;
export type RedditContent = SourceData<"reddit", RedditData>;
export type NewsContent = SourceData<"news">;
export type InstagramContent = SourceData<"instagram", InstagramData>;
export type TikTokContent = SourceData<"tiktok">;
export type Content = YoutubeContent | TwitterContent | RedditContent | NewsContent | InstagramContent | TikTokContent;

type FilteredContentType<T extends Content["source"]> = Extract<Content, { source: T }>;
