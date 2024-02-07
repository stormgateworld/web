import { As, Tooltip as KTooltip } from "@kobalte/core"
import { children, createEffect, createMemo, type JSX, type ParentProps } from "solid-js"

export function Tooltip(props: ParentProps<{ content: string; class?: string }>) {
  return (
    <KTooltip.Root gutter={2}>
      <KTooltip.Trigger class={`outline-none ${props.class}`}>{props.children}</KTooltip.Trigger>
      <KTooltip.Portal>
        <KTooltip.Content class="bg-gray-800 text-gray-200 rounded-sm py-1 px-1.5 border border-gray-700/50 shadow-sm animate-in slide-in-from-bottom-1 fade-in">
          <KTooltip.Arrow />
          <p>{props.content}</p>
        </KTooltip.Content>
      </KTooltip.Portal>
    </KTooltip.Root>
  )
}
