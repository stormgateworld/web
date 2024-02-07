import { As, Tooltip as KTooltip } from "@kobalte/core"
import { children, createEffect, createMemo, type JSX, type ParentProps } from "solid-js"

export function Tooltip(props: ParentProps<{ content: string; class?: string }>) {
  return (
    <KTooltip.Root gutter={2}>
      <KTooltip.Trigger class={`outline-none ${props.class}`}>{props.children}</KTooltip.Trigger>
      <KTooltip.Portal>
        <KTooltip.Content class="rounded-sm border border-gray-700/50 bg-gray-800 px-1.5 py-1 text-gray-200 shadow-sm animate-in fade-in slide-in-from-bottom-1">
          <KTooltip.Arrow />
          <p class="whitespace-pre-wrap">{props.content}</p>
        </KTooltip.Content>
      </KTooltip.Portal>
    </KTooltip.Root>
  )
}
