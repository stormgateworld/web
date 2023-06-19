import { createSignal, createContext, useContext } from "solid-js"

const FiltersContext = createContext()

interface Props {
  path: string
  options: any
  children: any
}

interface Context {
  setFilter: (name: string, value: string) => void
}

export function FiltersProvider(props: Props) {
  const [options, setOptions] = createSignal(props.options || {})
  const state: Context = {
    setFilter(name: string, value: string) {
      setOptions({ ...options(), [name]: value })

      let urlParams: any = {}
      for (const [key, value] of Object.entries(options())) {
        urlParams[key.slice(0, 1)] = value
      }
      const params = new URLSearchParams(urlParams).toString()
      window.location.href = `${props.path}?${params}`
    },
  }

  return <FiltersContext.Provider value={state}>{props.children}</FiltersContext.Provider>
}

export function useFilters(): Context {
  return useContext(FiltersContext) as Context
}
