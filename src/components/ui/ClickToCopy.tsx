import type { ParentComponent } from "solid-js"
import { Toast, toaster } from "@kobalte/core"
import { Portal } from "solid-js/web"
import xIcon from "lucide-static/icons/x.svg?raw"

export const ClickToCopy: ParentComponent<{ class?: string; value?: string }> = (props) => {
  const onClick = async () => {
    if (props.value) {
      await navigator.clipboard.writeText(props.value)
      showToast()
    }
  }

  const showToast = () => {
    toaster.show((props) => (
      <Toast.Root toastId={props.toastId} class="rounded-md border-gray-500 bg-gray-800 p-4">
        <div class="flex justify-around gap-2">
          <Toast.Title class="font-bold text-gray-50">Copied to clipboard</Toast.Title>
          <Toast.CloseButton>
            <span innerHTML={xIcon} class="text-gray-200 *:w-4" />
          </Toast.CloseButton>
        </div>
      </Toast.Root>
    ))
  }

  return (
    <>
      <div class={props.class} onClick={onClick}>
        {props.children}
      </div>
      <Portal>
        <Toast.Region duration={2000}>
          <Toast.List class="fixed bottom-0 right-0 flex w-64 flex-col gap-2 p-4" />
        </Toast.Region>
      </Portal>
    </>
  )
}
