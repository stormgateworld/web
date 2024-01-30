import infernals from "../../assets/game/factions/infernals-small.png"
import vanguard from "../../assets/game/factions/vanguard-small.png"
import { urlencode } from "../../lib/utils"
import { LeaderboardsApi, Race } from "../../lib/api"
import { Suspense, createEffect, createResource, createSignal, onMount, useTransition } from "solid-js"
import { Widget } from "../ui/Widget"
import { SelectButton, type SelectButtonOption } from "../ui/SelectButton"
import { classes } from "../../lib/theme"
import { Pagination } from "../ui/Pagination"

interface Props {
  mode?: string
  faction?: Race
  query?: string
  page?: number
}
const perPage = 100

const factionOptions: SelectButtonOption[] = [
  { label: "All Factions", value: "all" },
  { label: "Infernals", value: Race.INFERNALS },
  { label: "Vanguard", value: Race.VANGUARD },
]

const getFactionOption = (value: string | undefined) =>
  factionOptions.find((option) => option.value === value) || factionOptions[0]

export function Leaderboard(props: Props) {
  const [count, setCount] = createSignal(perPage)
  const [query, setQuery] = createSignal(props.query || undefined)
  const [page, setPage] = createSignal(props.page || 1)
  const [mode, setMode] = createSignal(props.mode ?? "ranked_1v1")
  const [faction, setFaction] = createSignal(props.faction ?? undefined)
  const [isPending, start] = useTransition()
  const [isBrowserNavigation, setIsBrowserNavigation] = createSignal(true)

  const getOptions = () => ({ count: count(), page: page(), mode: mode(), race: faction(), query: query() })
  const [data] = createResource(getOptions, LeaderboardsApi.getLeaderboard)
  const [selectedFaction, setSelectedFaction] = createSignal(getFactionOption(props.faction))

  createEffect(() =>
    start(() => {
      setPage(1)
      setFaction(((f) => (f === "all" ? undefined : f))(selectedFaction()?.value as Race | "all"))
    })
  )

  function updateHistory(options: ReturnType<typeof getOptions>, replace: boolean = false) {
    const searchParams = new URLSearchParams(window?.location.search)
    const { page, query, race: faction } = options
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

  createEffect(() => console.log(selectedFaction()))

  return (
    <div>
      <div class="flex justify-between py-4 flex-wrap gap-4">
        <SelectButton options={factionOptions} value={selectedFaction} setValue={setSelectedFaction} />
      </div>
      <Widget title="Leaderboard" label="Closed Beta">
        <Suspense fallback={<div>Loading...</div>}>
          <table
            class={classes(
              "table-auto mx-auto w-full text-left md:text-lg whitespace-nowrap transition-opacity",
              isPending() ? "opacity-70" : ""
            )}
          >
            <tbody>
              {data()?.entries.map((entry) => (
                <tr>
                  <td class="md:pr-2 py-1 text-right text-gray-50 font-extrabold text-lg md:text-xl">{entry.rank}.</td>
                  <td class="pr-0.5 md:pr-2">
                    <img
                      src={entry.race === "infernals" ? infernals.src : vanguard.src}
                      alt={entry.race}
                      class="w-6 h-6"
                    />
                  </td>
                  <td class="truncate max-w-20 md:max-w-none pr-2 text-white font-bold">
                    <a href={`/players/${entry.player_id}-${urlencode(entry.nickname!)}`}>{entry.nickname}</a>
                  </td>
                  <td class="pr-2 font-bold text-right text-gray-100">{Math.round(entry.mmr)}</td>
                  <td class="pr-0.5 text-gray-100 text-right">
                    {entry.wins}
                    <span class="text-green-400">W</span>
                  </td>
                  <td class="pr-0.5 text-gray-100 text-right">
                    {entry.losses}
                    <span class="text-red-400">L</span>
                  </td>
                  <td class="pr-2 text-right text-gray-100">{Math.round(entry.win_rate ?? 0)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Suspense>
      </Widget>
      <div class="py-2 flex justify-center">
        <Pagination page={page} totalPages={10} setPage={(p: number) => start(() => setPage(p))} />
      </div>
    </div>
  )
}
