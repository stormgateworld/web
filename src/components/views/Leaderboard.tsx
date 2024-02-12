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
  const [order, setOrder] = createSignal(props.order ?? undefined)
  const [faction, setFaction] = createSignal(props.faction ?? undefined)
  const [isPending, start] = useTransition()
  const [isBrowserNavigation, setIsBrowserNavigation] = createSignal(true)

  const getOptions = () => ({
    count: count(),
    page: page(),
    mode: mode(),
    race: faction(),
    order: order(),
    query: query(),
  })
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
        <div class="flex flex-wrap justify-between gap-4 py-4">
          <div class="flex flex-wrap justify-between gap-2">
            <SelectButton
              options={factionOptions}
              value={selectedFaction}
              setValue={setSelectedFaction}
              class="flex-auto sm:flex-none"
            />
            <div class={styles.button.set}>
              <button
                class={classes(
                  styles.button.sm,
                  styles.button.control,
                  "h-full",
                  order() !== LeaderboardOrder.MMR ? styles.button.highlighted : "text-gray-400"
                )}
                onClick={() => start(() => setOrder(LeaderboardOrder.POINTS))}
              >
                RP
              </button>
              <button
                class={classes(
                  styles.button.sm,
                  styles.button.control,
                  "h-full",
                  order() === LeaderboardOrder.MMR ? styles.button.highlighted : "bg-gray-800 text-gray-400"
                )}
                onClick={() => start(() => setOrder(LeaderboardOrder.MMR))}
              >
                MMR
              </button>
            </div>
          </div>
          <div class={classes(styles.button.set, "flex-auto md:flex-none")}>
            <input
              type="text"
              value={query() ?? ""}
              class={classes(styles.button.sm, "flex-auto bg-transparent text-white outline-none")}
              placeholder="Search"
              ref={searchInput}
              onKeyDown={(e) => e.key === "Enter" && setQuery(searchInput?.value)}
            />
            <button
              class={classes(styles.button.sm, styles.button.control, styles.button.trigger)}
              onClick={() => setQuery(searchInput?.value)}
            >
              <span innerHTML={searchIcon} class="text-gray-200 *:w-4" />
            </button>
          </div>
        </div>
      )}
      <Widget title="Leaderboard" label="Ranked Beta" class="-mx-3 sm:mx-0">
        <Suspense fallback={<div>Loading...</div>}>
          {data()?.total == 0 && <div class="my-6 text-center text-gray-400">No results found</div>}
          <div class="-mx-3 -mb-3 sm:-mx-4 md:-mb-3.5">
            <table
              class={classes(
                "mx-auto w-full table-auto whitespace-nowrap text-left transition-opacity md:text-lg",
                isPending() ? "opacity-70" : ""
              )}
            >
              <tbody>
                {data()?.entries.map((entry) => (
                  <tr class="border-b border-gray-700/50 last:border-b-0">
                    <td class="text-md  px-1 py-2 text-right font-extrabold text-gray-400 md:px-4 md:text-lg">
                      {/* TODO: remove when more data is available */}
                      {entry.rank ? entry.rank : <a href="/faq/#rp">&lt;1000</a>}.
                    </td>
                    <td class="min-w-10 pr-2 md:pr-4">
                      <img
                        src={entry.race === "infernals" ? infernals.src : vanguard.src}
                        alt={entry.race}
                        class="h-6 w-6"
                      />
                    </td>
                    <td class="w-full max-w-20 truncate pr-2 font-bold text-gray-50  md:max-w-none md:pr-4">
                      <div class="flex items-center gap-2">
                        <a
                          href={`/players/${entry.player_id}-${urlencode(entry.nickname!)}`}
                          class="truncate outline-none hover:text-white focus:text-white"
                        >
                          {entry.nickname}
                        </a>
                        {order() !== LeaderboardOrder.MMR && entry.rank && entry.rank <= 4 ? (
                          <Tooltip content="Top 4 Qualify for EGC Open Tournament" class="text-xs text-gray-400">
                            <img src={EsoIcon} class="w-6 flex-none" />
                          </Tooltip>
                        ) : (
                          <></>
                        )}
                      </div>
                    </td>
                    <td class=" pr-2 text-right text-sm font-bold  text-gray-100 md:pr-4">
                      <div class="flex items-center justify-end gap-1">
                        <span>
                          {/* TODO: remove when more data is available */}
                          {order() !== LeaderboardOrder.MMR ? (
                            entry.points ? (
                              Math.round(entry.points)
                            ) : (
                              <a href="/faq/#rp">-</a>
                            )
                          ) : (
                            Math.round(entry.mmr)
                          )}
                        </span>
                        {order() !== LeaderboardOrder.MMR ? (
                          <RankedBadge entry={entry} class="w-4 min-w-8 md:w-8" />
                        ) : (
                          "MMR"
                        )}
                      </div>
                    </td>
                    <td class=" pr-2 text-right text-sm text-gray-100 md:pr-4">
                      {entry.wins}
                      <span class="text-green-400"> W</span>
                    </td>
                    <td class=" pr-2 text-right text-sm text-gray-100 md:pr-4">
                      {entry.losses}
                      <span class="text-red-400"> L</span>
                    </td>
                    <td class="pr-2 text-right text-sm text-gray-100 md:pr-4">
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
        <div class="flex justify-center py-4">
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
