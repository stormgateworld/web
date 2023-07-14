import { useFilters } from "./FiltersContext"
import redditIcon from "../../assets/social/reddit.svg"
import youtubeIcon from "../../assets/social/youtube.svg"
import newsIcon from "../../assets/social/news.svg"
import twitterIcon from "../../assets/social/twitter.svg"
import instagramIcon from "../../assets/social/instagram.svg"
import tiktokIcon from "../../assets/social/tiktok.svg"
import substackIcon from "../../assets/social/substack.svg"

interface Tab {
  name: string
  icon?: string
}

const tabs: Tab[] = [
  { name: "All" },
  { name: "Reddit", icon: redditIcon },
  { name: "Youtube", icon: youtubeIcon },
  { name: "News", icon: newsIcon },
  { name: "Twitter", icon: twitterIcon },
  { name: "Substack", icon: substackIcon },
  { name: "Instagram", icon: instagramIcon },
  { name: "Tiktok", icon: tiktokIcon },
]

interface Props {
  default: string
}

export default function SourceFilterDesktop(props: Props) {
  const { setFilter } = useFilters()

  const chooseOption = (tabName: string) => {
    setFilter("source", tabName.toLocaleLowerCase())
  }

  return (
    <nav class="hidden space-x-5 xl:flex" aria-label="Tabs">
      {tabs.map((tab) =>
        tab.name.toLowerCase() == props.default ? (
          <a
            onClick={(e) => {
              e.preventDefault()
              chooseOption(tab.name)
            }}
            href="#"
            class="text-white-700 flex items-center whitespace-nowrap border-b-2 border-gray-100 px-1 py-2 text-sm font-medium"
            aria-current="page"
          >
            {tab.icon && <img src={tab.icon} class="mr-2 inline-block h-3" />}
            <span class="inline-block">{tab.name}</span>
          </a>
        ) : (
          <a
            onClick={(e) => {
              e.preventDefault()
              chooseOption(tab.name)
            }}
            href="#"
            class="whitespace-nowrap border-b-2 border-transparent px-1 py-2 text-sm font-medium text-gray-100 hover:border-white hover:text-white"
          >
            {tab.icon && <img src={tab.icon} class="mr-2 inline-block h-3" />}
            <span class="inline-block">{tab.name}</span>
          </a>
        )
      )}
    </nav>
  )
}
