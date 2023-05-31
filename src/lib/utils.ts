// dates can be undefined, in which case position remains unchanged
type CollectionEntryWithDate = { data: { date?: Date } };
export function sortCollectionByDate(a?: CollectionEntryWithDate, b?: CollectionEntryWithDate) {
  if (!a?.data.date || !b?.data.date) return 0;
  return b.data.date.getTime() - a.data.date.getTime();
}
