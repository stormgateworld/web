import Filter from "./Filter";
import SourceFilterDesktop from "./SourceFilterDesktop";
import { FiltersProvider } from "./FiltersContext";
import redditIcon from "../../assets/social/reddit.svg";
import youtubeIcon from "../../assets/social/youtube.svg";
import newsIcon from "../../assets/social/news.svg";
import twitterIcon from "../../assets/social/twitter.svg";
import instagramIcon from "../../assets/social/instagram.svg";
import tiktokIcon from "../../assets/social/tiktok.svg";

const sources = [
  { name: "All Sources", value: "all" },
  { name: "Reddit", value: "reddit", iconSrc: redditIcon },
  { name: "Youtube", value: "youtube", iconSrc: youtubeIcon },
  { name: "News", value: "news", iconSrc: newsIcon },
  { name: "Twitter", value: "twitter", iconSrc: twitterIcon },
  { name: "Instagram", value: "instagram", iconSrc: instagramIcon },
  { name: "TikTok", value: "tiktok", iconSrc: tiktokIcon },
];

const orders = [
  { name: "Relevant", value: "relevant" },
  // { name: "Popular", value: "popular" },
  { name: "Newest", value: "newest" },
];

const times = [
  { name: "All Time", value: "all" },
  { name: "Last 3 Days", value: "3d" },
  { name: "Last 7 Days", value: "7d" },
  { name: "Last 30 Days", value: "30d" },
];

interface Props {
  source: string;
  time: string;
  order: string;
}

export default function Filters(props: any) {
  return (
    <FiltersProvider options={{ source: props.source, time: props.time, order: props.order }}>
      <div class="mb-6 grid grid-cols-6 justify-items-center">
        <div class="place-self-start"></div>
        <div class="col-span-4 flex place-content-center place-self-center border-0 border-gray-200">
          <SourceFilterDesktop default={props.source} />
        </div>
        <div class="relative place-self-end">
          <div class="flex">
            <Filter name="source" options={sources} default={props.source} class="block xl:hidden" />
            <Filter name="order" options={orders} default={props.order} />
            <Filter name="time" options={times} default={props.time} />
          </div>
        </div>
      </div>
    </FiltersProvider>
  );
}
