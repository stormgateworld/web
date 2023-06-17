import Filter from "./Filter";
import SourceFilterDesktop from "./SourceFilterDesktop";
import { FiltersProvider } from "./FiltersContext";

const sources = [
  { name: "All Sources", value: "all" },
  { name: "Reddit", value: "reddit", iconSrc: "/content/websites/reddit.com.png" },
  { name: "Youtube", value: "youtube", iconSrc: "/content/websites/youtube.com.png" },
  { name: "News", value: "news", iconSrc: "/content/websites/news.png" },
  { name: "Twitter", value: "twitter", iconSrc: "/content/websites/twitter.com.png" },
  { name: "Instagram", value: "instagram", iconSrc: "/content/websites/instagram.com.png" },
  { name: "TiktTok", value: "tiktok", iconSrc: "/content/websites/tiktok.com.png" },
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
    <FiltersProvider options={props}>
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
