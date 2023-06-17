import { createSignal, createContext, useContext } from "solid-js";

const FiltersContext = createContext();

interface Props {
  currentToggle?: string;
  children: any;
}

export function FiltersProvider(props: Props) {
  const [currentToggle, setCurrentToggle] = createSignal(props.currentToggle);
  const [options, setOptions] = createSignal({});
  const state = [
    currentToggle,
    setCurrentToggle,
    {
      setOption(name: string, value: string) {
        setOptions({ ...options(), [name]: value });
        const params = new URLSearchParams(options()).toString();
        window.location.href = `/social?${params}`;
        console.log(options());
      },
    },
  ];

  return <FiltersContext.Provider value={state}>{props.children}</FiltersContext.Provider>;
}

export function useFilters() {
  return useContext(FiltersContext);
}
