import { As, Pagination as KPagination } from "@kobalte/core"
import { createEffect, createSignal } from "solid-js"
import { classes, styles } from "../../lib/theme"
import { type SetUrlConfig, createUrl } from "./utils"
import { style } from "solid-js/web"

export function Pagination(props: { page: number; totalPages: number; navigateOnChange?: SetUrlConfig }) {
  const useUrl = !!props.navigateOnChange
  const [page, setPage] = createSignal(props.page)
  if (useUrl)
    createEffect(() => {
      if (page() != props.page) window.location.href = createUrl(props.navigateOnChange!, page())
    })
  return (
    <KPagination.Root
      class="[&>ul]:inline-flex [&>ul]:justify-center [&>ul]:gap-2 [&>ul]:items-center"
      count={props.totalPages}
      page={page()}
      onPageChange={setPage}
      fixedItems
      siblingCount={1}
      itemComponent={(p) => (
        <KPagination.Item
          class={classes(
            styles.button.base,
            styles.button.sm,
            "ui-current:text-gray-50 ui-current:bg-gray-600/70 ui-current:border-gray-600",
            "hidden sm:inline-flex ui-current:inline-flex"
          )}
          page={p.page}
          asChild={useUrl}
        >
          {useUrl ? (
            <As component="a" href={createUrl(props.navigateOnChange!, p.page)}>
              {p.page}
            </As>
          ) : (
            p.page
          )}
        </KPagination.Item>
      )}
      ellipsisComponent={() => (
        <KPagination.Ellipsis
          class={classes(
            styles.button.base,
            styles.button.sm,
            "border-transparent !bg-transparent hidden sm:inline-flex"
          )}
        >
          ...
        </KPagination.Ellipsis>
      )}
    >
      <KPagination.Previous class={classes(styles.button.base, styles.button.sm)}>Previous</KPagination.Previous>
      <KPagination.Items />
      <KPagination.Next class={classes(styles.button.base, styles.button.sm)}>Next</KPagination.Next>
    </KPagination.Root>
  )
}
