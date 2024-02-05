import infernals from "../../assets/game/factions/infernals-small-glow.png"
import vanguard from "../../assets/game/factions/vanguard-small-glow.png"
import { urlencode } from "../../lib/utils"
import { LeaderboardsApi, Race, LeaderboardOrder } from "../../lib/api"
import { Suspense, createEffect, createResource, createSignal, on, onMount, useTransition } from "solid-js"
import { Widget } from "../ui/Widget"
import { SelectButton, type SelectButtonOption } from "../ui/SelectButton"
import { classes, styles } from "../../lib/theme"
import { Pagination } from "../ui/Pagination"
import searchIcon from "lucide-static/icons/search.svg?raw"
import { RankedBadge } from "../ui/RankedBadge"
import { Tooltip } from "../ui/Tooltip"

import EsoIcon from "../promos/eso.png?url"

interface Props {
  mode?: string
  faction?: Race
  query?: string
  page?: number
  limit?: number
  hideUi?: boolean
  order?: LeaderboardOrder
}
const perPage = 100

const factionOptions: SelectButtonOption[] = [
  { label: "All Factions", value: "all" },
  {
    label: "Infernals",
    value: Race.INFERNALS,
    icon: infernals.src,
  },
  { label: "Vanguard", value: Race.VANGUARD, icon: vanguard.src },
]

const getFactionOption = (value: string | undefined) =>
  factionOptions.find((option) => option.value === value) || factionOptions[0]

export function Leaderboard(props: Props) {
  const [count, setCount] = createSignal(props.limit ?? 100)
  const [query, setQuery] = createSignal(props.query || undefined)
  const [page, setPage] = createSignal(props.page || 1)
  const [mode, setMode] = createSignal(props.mode ?? "ranked_1v1")
  const [order, setOrder] =  createSignal(props.order ?? undefined)
  const [faction, setFaction] = createSignal(props.faction ?? undefined)
  const [isPending, start] = useTransition()
  const [isBrowserNavigation, setIsBrowserNavigation] = createSignal(true)

  const getOptions = () => ({ count: count(), page: page(), mode: mode(), race: faction(), order: order(), query: query() })
  const [data] = createResource(getOptions, LeaderboardsApi.getLeaderboard)
  const [selectedFaction, setSelectedFaction] = createSignal(getFactionOption(props.faction))
  const totalPages = () => Math.ceil((data()?.total ?? 1000) / count())

  createEffect(
    on([selectedFaction, query], () =>
      start(() => {
        setPage(1)
        setFaction(((f) => (f === "all" ? undefined : f))(selectedFaction()?.value as Race | "all"))
      })
    )
  )

  function updateHistory(options: ReturnType<typeof getOptions>, replace: boolean = false) {
    if (props.hideUi) return
    const searchParams = new URLSearchParams(window?.location.search)
    const { page, query, race: faction, order } = options
    if (order) searchParams.set("order", order)
    else searchParams.delete("order")
    if (faction) searchParams.set("faction", faction)
    else searchParams.delete("faction")
    if (page > 1) searchParams.set("page", page.toString())
    else searchParams.delete("page")
    if (query) searchParams.set("query", query)
    else searchParams.delete("query")

    const newLocation =
      searchParams.toString().length > 0
        ? `${window.location.pathname}?${searchParams.toString()}`
        : window.location.pathname

    if (searchParams.toString() == window.location.search || replace)
      window.history.replaceState(options, "", newLocation)
    else window.history.pushState(options, "", newLocation)
  }

  createEffect(() => {
    if (!isBrowserNavigation()) updateHistory(getOptions())
  })

  onMount(() => {
    window.addEventListener("popstate", (event) => {
      try {
        const state = event.state as Props
        setIsBrowserNavigation(true)
        setPage(state.page || 1)
        setSelectedFaction(getFactionOption(state.faction))
        setQuery(state.query || undefined)
      } catch (e) {
        console.error(e)
      } finally {
        window.setTimeout(() => setIsBrowserNavigation(false), 0)
      }
      return
    })
    updateHistory(getOptions(), true)
    setIsBrowserNavigation(false)
  })

  let searchInput!: HTMLInputElement

  return (
    <div>
      {props.hideUi ? (
        <></>
      ) : (
        <div class="flex justify-between py-4 flex-wrap gap-4">
          <div class="flex justify-between flex-wrap gap-4">
            <SelectButton
              options={factionOptions}
              value={selectedFaction}
              setValue={setSelectedFaction}
              class="flex-auto sm:flex-none"
            />
            <div class={classes(styles.button.set)}>
              <button class={classes(styles.button.sm, styles.button.control, 'h-full', order() !== LeaderboardOrder.MMR ? styles.button.highlighted : "")} onClick={() => setOrder(LeaderboardOrder.POINTS)}>Points</button>
              <button class={classes(styles.button.sm, styles.button.control, 'h-full', order() === LeaderboardOrder.MMR ? styles.button.highlighted : "")} onClick={() => setOrder(LeaderboardOrder.MMR)}>MMR</button>
            </div>
          </div>
          <div class={classes(styles.button.set, "flex-auto md:flex-none")}>
            <input
              type="text"
              value={query() ?? ""}
              class={classes(styles.button.sm, "outline-none bg-transparent text-white flex-auto")}
              placeholder="Search"
              ref={searchInput}
              onKeyDown={(e) => e.key === "Enter" && setQuery(searchInput?.value)}
            />
            <button
              class={classes(styles.button.sm, styles.button.control, styles.button.trigger)}
              onClick={() => setQuery(searchInput?.value)}
            >
              <span innerHTML={searchIcon} class="*:w-4 text-gray-200" />
            </button>
          </div>
        </div>
      )}
      <Widget title="Leaderboard" label="Ranked Beta" class="-mx-3 sm:mx-0">
        <Suspense fallback={<div>Loading...</div>}>
          {data()?.total == 0 && <div class="text-center my-6 text-gray-400">No results found</div>}
          <div class="-mx-3 sm:-mx-4 -mb-3">
            <table
              class={classes(
                "table-auto mx-auto w-full text-left md:text-lg whitespace-nowrap transition-opacity",
                isPending() ? "opacity-70" : ""
              )}
            >
              <tbody>
                {data()?.entries.map((entry) => (
                  <tr>
                    <td class="pr-0.5 md:pr-2 py-2 text-right text-gray-400 font-extrabold text-md md:text-lg border-b border-gray-700/50">
                      {entry.rank}.
                    </td>
                    <td class="pr-0.5 md:pr-2 border-b border-gray-700/50">
                      <img
                        src={entry.race === "infernals" ? infernals.src : vanguard.src}
                        alt={entry.race}
                        class="w-6 h-6"
                      />
                    </td>
                    <td class="truncate max-w-20 md:max-w-none pr-2 text-gray-50 font-bold  border-b border-gray-700/50">
                      <div class="flex items-center gap-2">
                        <a
                          href={`/players/${entry.player_id}-${urlencode(entry.nickname!)}`}
                          class="outline-none hover:text-white focus:text-white"
                        >
                          {entry.nickname}
                        </a>
                        {entry.rank && entry.rank <= 4 ? (
                          <Tooltip content="Top 4 Qualify for EGC Open Tournament" class="text-xs text-gray-400">
                            <img src={EsoIcon} class="w-6" />
                          </Tooltip>
                        ) : (
                          <></>
                        )}
                      </div>
                    </td>
                    <td class="pr-1 font-bold text-right text-sm text-gray-100  border-b border-gray-700/50">
                      <div class="flex items-center justify-end gap-1">
                        <span>{order() !== LeaderboardOrder.MMR ? Math.round(entry.points || 0) : Math.round(entry.mmr)}</span>
                        {order() !== LeaderboardOrder.MMR ? <RankedBadge entry={entry} class="w-4 md:w-8" /> : "MMR"}
                      </div>
                    </td>
                    <td class="pr-0.5 text-gray-100 text-right text-sm border-b border-gray-700/50">
                      {entry.wins}
                      <span class="text-green-400"> W</span>
                    </td>
                    <td class="pr-0.5 text-gray-100 text-right text-sm border-b border-gray-700/50">
                      {entry.losses}
                      <span class="text-red-400"> L</span>
                    </td>
                    <td class="pr-2 text-right text-gray-100 text-sm border-b border-gray-700/50">
                      {Math.round((entry.win_rate <= 1 ? entry.win_rate * 100 : entry.win_rate) ?? 0)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Suspense>
      </Widget>
      {props.hideUi ? (
        <></>
      ) : (
        <div class="py-4 flex justify-center">
          {totalPages() > 0 && (
            <Pagination
              page={Math.min(totalPages(), page())}
              totalPages={totalPages()}
              setPage={(p: number) => start(() => setPage(p))}
            />
          )}
        </div>
      )}
    </div>
  )
}
