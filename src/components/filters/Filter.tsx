import { createSignal, onCleanup, Show, For, createEffect } from "solid-js"

import { useFilters } from "./FiltersContext"

interface Option {
  name: string
  value: string
  iconSrc?: string
}

interface Props {
  icon?: boolean
  name: string
  label?: string
  options: Option[]
  default: string
  class?: string
}

function clickOutside(el: any, accessor: any) {
  const onClick = (e) => !el.contains(e.target) && accessor()?.()
  document.body.addEventListener("click", onClick)

  onCleanup(() => document.body.removeEventListener("click", onClick))
}

export default function Filter(props: Props) {
  const { setFilter } = useFilters()

  const [dropdown, setDropdown] = createSignal(false)

  const toggleDropdown = () => {
    setDropdown(!dropdown())
  }
  const [options, setOptions] = createSignal(props.options.filter((option) => option.value !== props.default))
  const [currentOption, setCurrentOption] = createSignal(props.options.find((option) => option.value === props.default))

  const chooseOption = (optionValue: string) => {
    const option = props.options.find((option) => option.value === optionValue)
    setCurrentOption(option)
    setDropdown(false)
    setOptions(props.options.filter((option) => option.value !== optionValue))
    setFilter(props.name, optionValue)
  }

  const wrapperClass = `relative ml-6 ${props.class || ""}`

  return (
    <div class={wrapperClass} use:clickOutside={() => setDropdown(false)}>
      <div class="py-2 text-sm">
        <button
          onClick={toggleDropdown}
          type="button"
          class="group inline-flex justify-center whitespace-nowrap font-medium text-gray-100 hover:text-white"
          id="mobile-menu-button"
          aria-expanded="false"
          aria-haspopup="true"
        >
          <Show when={currentOption()}>
            {currentOption()?.iconSrc && <img src={currentOption()?.iconSrc} class="mr-2 inline-block h-4" />}
            {currentOption()?.name}
          </Show>
          <svg class="ml-0 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path
              fill-rule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      <Show when={dropdown()}>
        <div
          class="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-black shadow-2xl ring-1 ring-white ring-opacity-20 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="mobile-menu-button"
          tabindex="-1"
        >
          <div class="py-1  text-sm font-medium" role="none">
            <span class="block whitespace-nowrap px-3 py-2 capitalize text-gray-300">{props.label || props.name}:</span>
            <For each={options()}>
              {(option, i) => (
                <span class="block whitespace-nowrap px-4 py-2 hover:bg-gray-700">
                  {option.iconSrc ? (
                    <img src={option.iconSrc} class="mr-2 inline-block h-4" />
                  ) : (
                    <div class={props.icon ? "mr-2 inline-block h-4 w-4" : ""}></div>
                  )}
                  <a
                    onClick={(e) => {
                      e.preventDefault()
                      chooseOption(option.value)
                    }}
                    href="#"
                    class="inline-block whitespace-nowrap text-gray-100"
                    role="menuitem"
                    tabindex="-1"
                    id="mobile-menu-item-2"
                  >
                    {option.name}
                  </a>
                </span>
              )}
            </For>
          </div>
        </div>
      </Show>
    </div>
  )
}
