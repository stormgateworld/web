import { Pagination as KPagination } from "@kobalte/core"
import { classes, styles } from "../../lib/theme"

export function Pagination(props: { page: number; setPage: (page: number) => void; totalPages: number }) {
  return (
    <KPagination.Root
      class="[&>ul]:inline-flex [&>ul]:items-center [&>ul]:justify-center [&>ul]:gap-2"
      count={props.totalPages}
      page={props.page}
      onPageChange={props.setPage}
      fixedItems={props.totalPages > 5}
      siblingCount={1}
      itemComponent={(p) => (
        <KPagination.Item
          class={classes(
            styles.button.base,
            styles.button.sm,
            "ui-current:border-gray-600 ui-current:bg-gray-600/70 ui-current:text-gray-50",
            "hidden ui-current:inline-flex sm:inline-flex"
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
            "hidden border-transparent !bg-transparent sm:inline-flex"
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
