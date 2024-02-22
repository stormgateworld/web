import { Popover as KPopover } from "@kobalte/core"
import type { JSX } from "astro/jsx-runtime"
import xIcon from "lucide-static/icons/x.svg?raw"

type PopoverProps = {
  trigger?: JSX.Element
  content?: JSX.Element
  title?: JSX.Element
}

export function Popover(props: PopoverProps) {
  return (
    <KPopover.Root>
      <KPopover.Trigger class="transition-transform hover:scale-125 hover:opacity-80">{props.trigger}</KPopover.Trigger>
      <KPopover.Portal>
        <KPopover.Content class="z-50 rounded-sm border border-gray-700/50 bg-gray-800 px-1.5 py-1.5 text-gray-200 shadow-sm animate-in fade-in slide-in-from-bottom-1">
          <KPopover.Arrow />
          <div class="flex items-center justify-between gap-4 px-2.5">
            <KPopover.Title class="whitespace-nowrap text-sm font-black text-white">{props.title}</KPopover.Title>
            <KPopover.CloseButton>
              <span innerHTML={xIcon} class="text-gray-200 *:w-4" />
            </KPopover.CloseButton>
          </div>
          <KPopover.Description class="m-2">{props.content}</KPopover.Description>
        </KPopover.Content>
      </KPopover.Portal>
    </KPopover.Root>
  )
}
