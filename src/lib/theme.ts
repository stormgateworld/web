export const styles = {
  layout: {
    containerPadding: `px-4 md:px-8`,
    container: `mx-auto max-w-screen-xl`,
    gap: `gap-4 md:gap-6`,
  },
  box: {
    base: `bg-gray-900/70 border border-gray-800/50 rounded-none md:rounded-xl -mx-4 md:mx-0`
  },
  button: {
    base: `inline-flex items-center justify-center rounded-sm
            bg-gray-800/85 border border-gray-700 backdrop-blur-sm
            text-gray-100 font-semibold whitespace-nowrap
            hover:bg-gray-700/95 hover:border-gray-600
            active:bg-gray-700/80 active:border-gray-500
            disabled:bg-gray-800/50 disabled:border-gray-800/50 disabled:text-gray-500
            outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-opacity-50
            transition duration-200`,
    sm: `px-3 py-1.5 text-sm`,
    md: `px-4 py-2 text-base`,
    highlighted: `bg-gray-700/50 border-gray-500`,
    trigger: `border-l border-[inherit]`,
    control: `border-[inherit] hover:bg-gray-700/95 hover:border-gray-600
        active:bg-gray-700/80 active:border-gray-500
        disabled:bg-gray-800/50 disabled:border-gray-800/50 disabled:text-gray-500
        outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-opacity-50
        transition duration-200`,
    set: `inline-flex items-center justify-center rounded-sm
        bg-gray-800/85 border border-gray-700 backdrop-blur-sm
        text-gray-100 font-semibold
        `,
  },
  dropdown: {
    wrapper: `bg-gray-800/85 border border-gray-700 backdrop-blur-sm`,
    list: `overflow-y-auto max-h-60 p-1`,
    item: `px-2 py-1.5 flex text-sm text-gray-50 rounded-sm cursor-pointer
            hover:bg-gray-500/50 ui-highlighted:bg-gray-600/20 ui-highlighted:!ring-0
            outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-opacity-50
            `,
  },
  tag: {
    base: `inline-flex items-center justify-center rounded-lg
        bg-gray-700/50 border border-gray-500 backdrop-blur-sm
        text-gray-100 font-semibold whitespace-nowrap text-sm
        outline-none transition duration-200 px-3 py-1.5`,
  },
  badges: {
    infernals: {
      badge: "bg-red-800/20 border-red-500/50",
      badgeLabel: "text-red-500",
    },
    vanguard: {
      badge: "bg-blue-800/20 border-blue-500/50",
      badgeLabel: "text-blue-500",
    },
    default: {
      badge: "bg-gray-800/20 border-gray-500/50",
      badgeLabel: "text-gray-600",
    },
  },
}

export function classes(...args: (string | undefined | number)[]) {
  return args.join(" ")
}
