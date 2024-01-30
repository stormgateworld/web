import { Pagination as KPagination } from "@kobalte/core"
import { type Accessor } from "solid-js"
import { classes, styles } from "../../lib/theme"

export function Pagination(props: { page: Accessor<number>; setPage: (page: number) => void; totalPages: number }) {
  return (
    <KPagination.Root
      class="[&>ul]:inline-flex [&>ul]:justify-center [&>ul]:gap-2 [&>ul]:items-center"
      count={props.totalPages}
      page={props.page()}
      onPageChange={props.setPage}
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
        >
          {p.page}
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
