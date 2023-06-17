import { createSignal, createContext, useContext } from "solid-js";

const FiltersContext = createContext();

interface Props {
  options?: any;
  currentToggle?: string;
  children: any;
}

export function FiltersProvider(props: Props) {
  const [currentToggle, setCurrentToggle] = createSignal(props.currentToggle);
  const [options, setOptions] = createSignal(props.options || {});
  const state = [
    currentToggle,
    setCurrentToggle,
    {
      setOption(name: string, value: string) {
        setOptions({ ...options(), [name]: value });

        let urlParams: any = {};
        for (const [key, value] of Object.entries(options())) {
          urlParams[key.slice(0, 1)] = value;
        }
        const params = new URLSearchParams(urlParams).toString();
        window.location.href = `/social?${params}`;
      },
    },
  ];

  return <FiltersContext.Provider value={state}>{props.children}</FiltersContext.Provider>;
}

export function useFilters() {
  return useContext(FiltersContext);
}
