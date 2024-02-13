import { PlayersApi } from "../../lib/api"
import { Suspense, createEffect, createResource, createSignal, on, onMount, useTransition } from "solid-js"
import { Widget } from "../ui/Widget"
import { Pagination } from "../ui/Pagination"
import MatchPreview from "./MatchPreview.tsx"

interface Props {
  page?: number
  limit?: number
  playerId: string
}
const perPage = 20

export function MatchHistory(props: Props) {
  const [count, setCount] = createSignal(props.limit ?? perPage)

  const [page, setPage] = createSignal(props.page || 1)

  const [isPending, start] = useTransition()
  const [isBrowserNavigation, setIsBrowserNavigation] = createSignal(true)

  const playerId = props.playerId

  const getOptions = () => ({
    count: count(),
    page: page(),
    playerId: props.playerId,
  })
  const [data] = createResource(getOptions, PlayersApi.getPlayerMatches)

  function updateHistory(options: ReturnType<typeof getOptions>, replace: boolean = false) {
    const searchParams = new URLSearchParams(window?.location.search)
    const { page } = options

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
        <Suspense fallback={<div>Loading...</div>}>
          {(data()?.matches || []).length === 0 && <div class="my-6 text-center text-gray-400">No results found</div>}
          <div class={isPending() ? "opacity-70" : ""}>
            {data()?.matches.map((match) => (
              <MatchPreview match={match} mainPlayerId={playerId} />
            ))}
          </div>

          <div class="flex justify-center py-4">
            <Pagination
              page={page()}
              setPage={(p: number) => start(() => setPage(p))}
              showLast={false}
              totalPages={(data()?.matches || []).length < perPage ? page() : page() + 2}
            />
          </div>
        </Suspense>
      </Widget>
    </div>
  )
}
