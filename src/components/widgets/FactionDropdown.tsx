import { createEffect, createSignal, onMount } from "solid-js"
import { SelectButton, type SelectButtonOption } from "../ui/SelectButton"
import infernals from "../../assets/game/factions/infernals-small-glow.png"
import vanguard from "../../assets/game/factions/vanguard-small-glow.png"
import { Race } from "../../lib/api"

const factionOptions: SelectButtonOption[] = [
  {
    label: "Infernals",
    value: Race.INFERNALS,
    icon: infernals.src,
  },
  { label: "Vanguard", value: Race.VANGUARD, icon: vanguard.src },
]

export function FactionDropdown(props: { queryParam: string; selected: (typeof factionOptions)[number]["value"] }) {
  const selected = props.selected ?? "all"
  const [faction, setFaction] = createSignal(
    factionOptions.find((option) => option.value === selected) || factionOptions[0]
  )

  createEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    if (faction()?.value === selected) return
    if (faction()?.value && faction()?.value != "all") urlParams.set(props.queryParam, faction()?.value!)
    else urlParams.delete(props.queryParam)
    window.location.href = `${window.location.pathname}${urlParams.size ? "?" + urlParams.toString() : ""}`
  })

  return <SelectButton options={factionOptions} value={faction} setValue={setFaction} />
}
