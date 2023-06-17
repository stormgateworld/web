import { createSignal, Show, For, createEffect } from "solid-js";
import Astro from "astro";

import Filter from "./Filter";
import { FiltersProvider } from "./FiltersContext";

interface Tab {
  name: string;
  icon?: string;
}

const tabs: Tab[] = [
  { name: "All" },
  { name: "Reddit", icon: "/content/websites/reddit.com.png" },
  { name: "Youtube", icon: "/content/websites/youtube.com.png" },
  { name: "News", icon: "/content/websites/news.png" },
  { name: "Twitter", icon: "/content/websites/twitter.com.png" },
  { name: "Instagram", icon: "/content/websites/instagram.com.png" },
  { name: "Tiktok", icon: "/content/websites/tiktok.com.png" },
];

function tabPath(tab: Tab) {
  if (tab.name == "All") {
    return "/social";
  } else {
    return `/social/${tab.name.toLowerCase()}`;
  }
}

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
  { name: "Popular", value: "popular" },
  { name: "Newest", value: "newest" },
];

const times = [
  { name: "All Time", value: "all" },
  { name: "Last 3 Days", value: "3d" },
  { name: "Last 7 Days", value: "7d" },
  { name: "Last 30 Days", value: "30d" },
];

interface Props {
  source?: string;
  time?: string;
  order?: string;
}

export default function Filters(props: any) {
  const activeTab = props.source || "all";

  return (
    <div class="mb-6 grid grid-cols-6 justify-items-center">
      <div class="place-self-start"></div>
      <div class="col-span-4 flex place-content-center place-self-center border-0 border-gray-200">
        <nav class="hidden space-x-2 sm:space-x-8 xl:flex" aria-label="Tabs">
          {tabs.map((tab) =>
            tab.name.toLowerCase() == activeTab ? (
              <a
                href={tabPath(tab)}
                class="text-white-700 whitespace-nowrap border-b-2 border-gray-100 px-1 py-2 text-sm font-medium"
                aria-current="page"
              >
                {tab.icon ? (
                  <img src={tab.icon} class="inline-block h-6 sm:mr-2 sm:h-3" />
                ) : (
                  <span class="sm:hidden">{tab.name}</span>
                )}
                <span class="hidden sm:inline-block">{tab.name}</span>
              </a>
            ) : (
              <a
                href={tabPath(tab)}
                class="whitespace-nowrap border-b-2 border-transparent px-1 py-2 text-sm font-medium text-gray-100 hover:border-white hover:text-white"
              >
                {tab.icon ? (
                  <img src={tab.icon} class="inline-block h-6 sm:mr-2 sm:h-3" />
                ) : (
                  <span class="sm:hidden">{tab.name}</span>
                )}
                <span class="hidden sm:inline-block">{tab.name}</span>
              </a>
            )
          )}
        </nav>
      </div>
      <div class="relative place-self-end">
        <div class="flex">
          <FiltersProvider>
            <Filter name="source" options={sources} default={props.source || "all"} class="block xl:hidden" />
            <Filter name="order" options={orders} default={props.order || "relevant"} />
            <Filter name="time" options={times} default={props.time || "7d"} />
          </FiltersProvider>
        </div>
      </div>
    </div>
  );
}
