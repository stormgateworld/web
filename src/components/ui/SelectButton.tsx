import { Select } from "@kobalte/core"
import { createUrl, type SetUrlConfig } from "./utils"
import { classes, styles } from "../../lib/theme"
import { createEffect, createSignal } from "solid-js"

// Todo probably also support string[] for options
export type SelectButtonOption = { label: string; value: string | null }
export function SelectButton(props: {
  options: SelectButtonOption[]
  value: SelectButtonOption
  navigateOnChange?: SetUrlConfig
}) {
  const [value, setValue] = createSignal<SelectButtonOption | null>(props.value)
  createEffect(() => {
    if (value() == null) setValue(props.options.find((option) => option.value == null) || null)
  })
  if (props.navigateOnChange)
    createEffect(() => {
      if (value() != props.value) window.location.href = createUrl(props.navigateOnChange!, value()?.value)
    })
  return (
    <Select.Root
      value={value()}
      onChange={setValue}
      options={props.options}
      optionValue="value"
      optionTextValue="label"
      itemComponent={(props) => (
        <Select.Item item={props.item} class={styles.dropdown.item}>
          <Select.ItemLabel>{props.item.rawValue?.label}</Select.ItemLabel>
        </Select.Item>
      )}
    >
      <Select.Trigger class={styles.button.base}>
        <Select.Value<string> class={styles.button.sm}>{value()?.label}</Select.Value>
        <Select.Icon class={classes(styles.button.sm, styles.button.trigger)}>↓</Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content class={styles.dropdown.wrapper}>
          <Select.Listbox class={styles.dropdown.list} />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
