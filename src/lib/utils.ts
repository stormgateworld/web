// dates can be undefined, in which case position remains unchanged
type CollectionEntryWithDate = { data: { date?: Date } }
export function sortCollectionByDate(a?: CollectionEntryWithDate, b?: CollectionEntryWithDate) {
  if (!a?.data.date || !b?.data.date) return 0
  return b.data.date.getTime() - a.data.date.getTime()
}

/** Format number to short format */
export function formatNumber(num: number | string) {
  num = Number(num)
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M"
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K"
  } else {
    return num.toString()
  }
}

export function debugLog(log: string) {
  console.log(`\x1b[37m${new Date().toLocaleTimeString()} \x1b[96m[debug] \x1b[97m${log}\x1b[0m\n`)
}

export function formatDuration(seconds?: number | null) {
  if (!seconds) return ""

  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.round(seconds % 60)
  return `${h > 0 ? `${h}h ` : ""}${h && m < 10 ? `0${m}` : m}m ${s < 10 ? `0${s}` : s}s`
}

export function urlencode(str: string) {
  return encodeURIComponent(str).replace(/%20/g, "-").replace(/%2F/g, "-")
}

export async function getDataOrErrorResponse<T extends readonly unknown[] | []>(
  ...values: T
): Promise<[{ -readonly [P in keyof T]: Awaited<T[P]> }, error: Response | null]> {
  try {
    const result = await Promise.all(values)
    return [result, null]
  } catch (e) {
    return [[] as any, new Response(null, { status: 500, statusText: `${e}` })]
  }
}
