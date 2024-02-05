import { createEffect, createSignal, onMount } from "solid-js"
import { leagues as icons } from "../../assets/game/leagues/leagues"
import { SelectButton, type SelectButtonOption } from "../ui/SelectButton"
const leages: SelectButtonOption[] = [
  {
    label: "All Leagues",
    value: "all",
  },
  {
    label: "Master",
    value: "master",
    icon: icons.master3.src,
  },
  {
    label: "Diamond",
    value: "diamond",
    icon: icons.diamond3.src,
  },
  {
    label: "Platinum",
    value: "platinum",
    icon: icons.platinum3.src,
  },
  {
    label: "Gold",
    value: "gold",
    icon: icons.gold3.src,
  },
  {
    label: "Silver",
    value: "silver",
    icon: icons.silver3.src,
  },
  {
    label: "Bronze",
    value: "bronze",
    icon: icons.bronze3.src,
  },
  {
    label: "Aspirant",
    value: "aspirant",
    icon: icons.aspirant3.src,
  },
] as const

export function LeagueDropdown(props: { queryParam: string; selected: (typeof leages)[number]["value"] }) {
  const selected = props.selected ?? "all"
  const [league, setLeague] = createSignal(leages.find((option) => option.value === selected) || leages[0])

  createEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    if (league()?.value === selected) return
    if (league()?.value && league()?.value != "all") urlParams.set(props.queryParam, league()?.value!)
    else urlParams.delete(props.queryParam)
    window.location.href = `${window.location.pathname}${urlParams.size ? "?" + urlParams.toString() : ""}`
  })

  return <SelectButton options={leages} value={league} setValue={setLeague} />
}
