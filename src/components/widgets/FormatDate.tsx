import { createSignal, onCleanup, onMount } from "solid-js"

export type DateFormat = "shortdate" | "mediumdate" | "shortdatetime" | "mediumdatetime" | "relative" | "shortrelative"
interface StyleMap {
  [key: string]: "short" | "medium" | "long" | undefined
}

const dateStyles: StyleMap = {
  shortrelative: "short",
  relative: "medium",
  shortdate: "short",
  mediumdate: "medium",
  shortdatetime: "short",
  mediumdatetime: "medium",
}

const timeStyles: StyleMap = {
  shortrelative: "short",
  relative: "medium",
  shortdate: undefined,
  mediumdate: undefined,
  shortdatetime: "short",
  mediumdatetime: "medium",
}

function parseUTC(date: Date | string): Date {
  if (date instanceof Date) return date
  // We assume a date string in the format %Y-%m-%dT%H:%M as returned from the API.
  // Adding a Z makes the fact that it's UTC explicit, so JS parses it correctly.
  return new Date(Date.parse(date + "Z"))
}

export function formatDate(date: Date, format: DateFormat, utc: boolean = false): string {
  if (format === "relative") return formatDateRelative(date, false)
  if (format === "shortrelative") return formatDateRelative(date, true)

  const timeStyle = timeStyles[format]
  const dateStyle = dateStyles[format]
  const timeZone = utc ? "UTC" : undefined
  let datestring =
    timeStyle !== undefined
      ? date.toLocaleString("en", { dateStyle, timeStyle, timeZone, hour12: false })
      : date.toLocaleDateString("en", { dateStyle, timeZone, hour12: false })
  if (utc) datestring += " UTC"
  return datestring
}

export function formatDateRelative(date: Date, short: boolean = false) {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 30 * 12))
  const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor(diff / (1000 * 60))
  const seconds = Math.floor(diff / 1000)
  if (short) {
    if (years > 0) return `${years}y`
    else if (months > 0) return `${months}mo`
    else if (days > 0) return `${days}d`
    else if (hours > 0) return `${hours}h`
    else if (minutes > 0) return `${minutes}m`
    else if (seconds > 0) return `${seconds}m`
    return "now"
  }
  if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`
  else if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`
  else if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`
  else if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`
  else if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`
  else if (seconds > 0) return `${seconds} second${seconds > 1 ? "s" : ""} ago`
  else return "now"
}

export interface FormatDateProps {
  date: Date | string
  format: DateFormat
}
export default function FormatDate({ date, format }: FormatDateProps) {
  const d = parseUTC(date)
  const [output, setOutput] = createSignal<string>(formatDate(d, format, true))
  const isRelative = format === "relative" || format === "shortrelative"

  onMount(() => {
    const update = () => {
      const x = formatDate(d, format, false)
      console.log("New date rendered:", x)
      setOutput(x)
    }

    if (isRelative) {
      // Dynamically updating display for client-side relative times
      const interval = setInterval(update, 1000)
      onCleanup(() => clearInterval(interval))
    }

    update()
  })

  return <>{output()}</>
}
