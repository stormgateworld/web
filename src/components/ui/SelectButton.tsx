import { Select } from "@kobalte/core"
import { classes, styles } from "../../lib/theme"
import { type Accessor, type Setter } from "solid-js"

// Todo probably also support string[] for options
export type SelectButtonOption = { label: string; value: string | null }
export function SelectButton(props: {
  options: SelectButtonOption[]
  value: Accessor<SelectButtonOption>
  setValue: Setter<SelectButtonOption>
}) {
  return (
    <Select.Root
      value={props.value()}
      onChange={props.setValue}
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
        <Select.Value<string> class={styles.button.sm}>{props.value()?.label}</Select.Value>
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
