import infernals from "../../assets/game/factions/infernals-small-glow.png"
import vanguard from "../../assets/game/factions/vanguard-small-glow.png"
import { PlayersApi, Race } from "../../lib/api"
import { Suspense, createEffect, createResource, createSignal, on, onMount, useTransition } from "solid-js"
import { Widget } from "../ui/Widget"
import { Pagination } from "../ui/Pagination"
import MatchPreview from "./MatchPreview.tsx"
import { SelectButton, type SelectButtonOption } from "../ui/SelectButton.tsx"

interface Props {
  page?: number
  limit?: number
  faction?: Race
  playerId: string
}
const perPage = 20

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

export function MatchHistory(props: Props) {
  const [count, setCount] = createSignal(props.limit ?? perPage)

  const [page, setPage] = createSignal(props.page || 1)
  const [faction, setFaction] = createSignal(props.faction ?? undefined)

  const [isPending, start] = useTransition()
  const [isBrowserNavigation, setIsBrowserNavigation] = createSignal(true)

  const playerId = props.playerId

  const getOptions = () => ({
    count: count(),
    page: page(),
    race: faction(),
    playerId: props.playerId,
  })
  const [data] = createResource(getOptions, PlayersApi.getPlayerMatches)
  const [selectedFaction, setSelectedFaction] = createSignal(getFactionOption(props.faction))
  const totalPages = () => Math.ceil((data()?.total ?? 1000) / count())

  createEffect(
    on([selectedFaction], () =>
      start(() => {
        setPage(1)
        setFaction(((f) => (f === "all" ? undefined : f))(selectedFaction()?.value as Race | "all"))
      })
    )
  )

  function updateHistory(options: ReturnType<typeof getOptions>, replace: boolean = false) {
    const searchParams = new URLSearchParams(window?.location.search)
    const { page, race: faction } = options

    if (faction) searchParams.set("faction", faction)
    else searchParams.delete("faction")
    if (page > 1) searchParams.set("page", page.toString())
    else searchParams.delete("page")

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

  return (
    <div>
      <Widget title="Match History" label="Closed Beta Ranked">
        <div class="flex flex-wrap justify-between gap-4 py-4">
          <div class="flex flex-wrap justify-between gap-2">
            <SelectButton
              options={factionOptions}
              value={selectedFaction}
              setValue={setSelectedFaction}
              class="flex-auto sm:flex-none"
            />
          </div>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          {data()?.total == 0 && <div class="my-6 text-center text-gray-400">No results found</div>}
          <div class={isPending() ? "opacity-70" : ""}>
            {data()?.matches.map((match) => (
              <MatchPreview match={match} mainPlayerId={playerId} />
            ))}
          </div>

          <div class="flex justify-center py-4">
            {totalPages() > 0 && (
              <Pagination
                page={Math.min(totalPages(), page())}
                totalPages={totalPages()}
                setPage={(p: number) => start(() => setPage(p))}
              />
            )}
          </div>
        </Suspense>
      </Widget>
    </div>
  )
}
