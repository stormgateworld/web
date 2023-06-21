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
