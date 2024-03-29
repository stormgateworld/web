import Filter from "../filters/Filter"
import SourceFilterDesktop from "../filters/SourceFilterDesktop"
import { FiltersProvider } from "../filters/FiltersContext"
import { languages } from "../filters/Common"

import redditIcon from "../../assets/social/reddit.svg"
import youtubeIcon from "../../assets/social/youtube.svg"
import newsIcon from "../../assets/social/news.svg"
import twitterIcon from "../../assets/social/twitter.svg"

const sources = [
  { name: "All Sources", value: "all" },
  { name: "Youtube", value: "youtube", iconSrc: youtubeIcon.src },
  { name: "News", value: "news", iconSrc: newsIcon.src },
  { name: "Reddit", value: "reddit", iconSrc: redditIcon.src },
  { name: "Twitter", value: "twitter", iconSrc: twitterIcon.src },
]

const orders = [
  { name: "Relevant", value: "relevant" },
  { name: "Popular", value: "popular" },
  { name: "Newest", value: "newest" },
]

const times = [
  { name: "All Time", value: "all" },
  { name: "Last Day", value: "1d" },
  { name: "Last 3 Days", value: "3d" },
  { name: "Last 7 Days", value: "7d" },
  { name: "Last 30 Days", value: "30d" },
]

interface Props {
  path: string
  language: string
  source: string
  time: string
  order: string
}

export default function SocialFilters(props: any) {
  return (
    <FiltersProvider path={props.path} options={{ source: props.source, time: props.time, order: props.order }}>
      <div class="mb-6 flex">
        <div class="flex flex-auto">
          <SourceFilterDesktop default={props.source} />
        </div>
        <div class="flex flex-col items-end sm:flex-row">
          <div class="mb-3 flex sm:mb-0">
            <Filter name="language" icon={true} options={languages} default={props.language} />
            <Filter name="source" icon={true} options={sources} default={props.source} class="block xl:hidden" />
          </div>
          <div class="flex">
            <Filter name="order" options={orders} default={props.order} />
            <Filter name="time" options={times} default={props.time} />
          </div>
        </div>
      </div>
    </FiltersProvider>
  )
}
