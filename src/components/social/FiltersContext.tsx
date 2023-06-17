import { createSignal, createContext, useContext } from "solid-js";

const FiltersContext = createContext();

interface Props {
  options?: any;
  children: any;
}

interface Context {
  setFilter: (name: string, value: string) => void;
}

export function FiltersProvider(props: Props) {
  console.log(props.options);
  const [options, setOptions] = createSignal(props.options || {});
  const state: Context = {
    setFilter(name: string, value: string) {
      console.log(name, value);
      setOptions({ ...options(), [name]: value });

      let urlParams: any = {};
      for (const [key, value] of Object.entries(options())) {
        urlParams[key.slice(0, 1)] = value;
      }
      const params = new URLSearchParams(urlParams).toString();
      window.location.href = `/social?${params}`;
    },
  };

  return <FiltersContext.Provider value={state}>{props.children}</FiltersContext.Provider>;
}

export function useFilters(): Context {
  return useContext(FiltersContext) as Context;
}
