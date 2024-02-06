import { Select } from "@kobalte/core"
import { classes, styles } from "../../lib/theme"
import { type JSX, type Accessor, type Setter } from "solid-js"
import chevronDown from "lucide-static/icons/chevron-down.svg?raw"
// Todo probably also support string[] for options
export type SelectButtonOption = {
  label: string
  value: string | null
  icon?: string
}
export function SelectButton(props: {
  options: SelectButtonOption[]
  value: Accessor<SelectButtonOption>
  setValue: Setter<SelectButtonOption>
  class?: string
}) {
  const anyIcon = props.options.some((option) => option.icon)

  return (
    <Select.Root
      value={props.value()}
      onChange={props.setValue}
      options={props.options}
      optionValue="value"
      optionTextValue="label"
      class={props.class}
      disallowEmptySelection
      itemComponent={(props) => (
        <Select.Item item={props.item} class={styles.dropdown.item}>
          <Select.ItemLabel class="flex items-center font-semibold">
            {props.item.rawValue?.icon ? (
              <img src={props.item.rawValue?.icon} class="mr-2 w-4 object-contain" />
            ) : anyIcon ? (
              <span class="w-6" />
            ) : (
              <></>
            )}
            {props.item.rawValue?.label}
          </Select.ItemLabel>
        </Select.Item>
      )}
    >
      <Select.Trigger class={classes(styles.button.base, "w-full")}>
        <Select.Value<string> class={classes(styles.button.sm, "inline-flex items-center font-semibold flex-auto")}>
          {props.value()?.icon && <img src={props.value()?.icon} class="mr-2 w-4 object-contain" />}
          {props.value()?.label}
        </Select.Value>
        <Select.Icon class={classes(styles.button.sm, styles.button.trigger, "flex-none")}>
          <span class="*:w-4 text-gray-300 sm:*:-mx-1" innerHTML={chevronDown} />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content class={styles.dropdown.wrapper}>
          <Select.Listbox class={styles.dropdown.list} />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
