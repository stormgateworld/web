import Filter from "../filters/Filter"
import { FiltersProvider } from "../filters/FiltersContext"

const orders = [
  { name: "Popular", value: "popular" },
  { name: "Most Content", value: "active" },
  { name: "Recent Content", value: "recent" },
]

const times = [
  { name: "Last Month", value: "1m" },
  { name: "Last 3 Months", value: "3m" },
  { name: "Last 6 Months", value: "6m" },
  { name: "Last Year", value: "1y" },
]

interface Props {
  path: string
  time: string
  order: string
}

export default function CreatorsFilters(props: any) {
  return (
    <FiltersProvider path={props.path} options={{ time: props.time, order: props.order }}>
      <div class="mb-6 grid grid-cols-6 justify-items-center">
        <div class="place-self-start"></div>
        <div class="col-span-4 flex place-content-center place-self-center border-0 border-gray-200"></div>
        <div class="relative place-self-end">
          <div class="flex">
            <Filter name="order" options={orders} default={props.order} />
            <Filter name="time" options={times} default={props.time} />
          </div>
        </div>
      </div>
    </FiltersProvider>
  )
}
