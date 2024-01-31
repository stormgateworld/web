import type { ParentComponent } from "solid-js"

export const Widget: ParentComponent<{ title?: string; label?: string; class?: string }> = (props) => (
  <div
    class={`rounded-xl bg-gray-900/70 border border-gray-500/40 p-3 sm:p-4 relative backdrop-blur-md overflow-auto ${props.class}`}
  >
    <div class="flex items-center flex-wrap gap-x-5 gap-y-1 sticky top-0 left-0">
      <h3 class="flex-auto font-display text-xl font-bold text-gray-200">{props.title}</h3>
      <p class="text-gray-400 text-md font-bold">{props.label}</p>
    </div>
    <div class="mt-3 md:mt-4">{props.children}</div>
  </div>
)
