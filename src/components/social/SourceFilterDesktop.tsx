import { useFilters } from "./FiltersContext";

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

interface Props {
  default: string;
}

export default function SourceFilterDesktop(props: Props) {
  const [currentToggle, setCurrentToggle, { setOption }] = useFilters();

  const chooseOption = (tabName: string) => {
    setOption("source", tabName.toLocaleLowerCase());
  };

  return (
    <nav class="hidden space-x-2 sm:space-x-8 xl:flex" aria-label="Tabs">
      {tabs.map((tab) =>
        tab.name.toLowerCase() == props.default ? (
          <a
            onClick={(e) => {
              e.preventDefault();
              chooseOption(tab.name);
            }}
            href="#"
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
            onClick={(e) => {
              e.preventDefault();
              chooseOption(tab.name);
            }}
            href="#"
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
  );
}
