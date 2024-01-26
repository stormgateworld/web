export type SetUrlConfig = {
    url: string
    queryParam: string
    reset?: string[]
}

export function createUrl({ url, queryParam, reset }: SetUrlConfig, value?: string | number | null) {
    const urlObject = new URL(url)
    if (value) urlObject.searchParams.set(queryParam, value.toString())
    else urlObject.searchParams.delete(queryParam)
    if (reset) reset.forEach(param => urlObject.searchParams.delete(param))
    return urlObject.toString()
}