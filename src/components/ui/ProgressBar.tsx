import { Progress } from "@kobalte/core"
import { classes } from "../../lib/theme"

type ProgressBarProps = {
  value: number
  class?: string
  backgroundColor?: string
}

export function ProgressBar(props: ProgressBarProps) {
  return (
    <Progress.Root value={props.value} class={classes("flex-auto", props.class)}>
      <Progress.Track class={classes("h-1.5  rounded-sm", props.backgroundColor || "bg-red-600")}>
        <Progress.Fill class="h-full rounded-l-sm bg-green-600" style={{ width: "var(--kb-progress-fill-width)" }} />
      </Progress.Track>
    </Progress.Root>
  )
}
