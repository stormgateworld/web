type ProgressCircleProps = {
  value: number
  class?: string
}

export function ProgressCircle(props: ProgressCircleProps) {
  const value = Math.min(100, Math.max(0, props.value))

  const dx = Math.sin((value / 100.0) * 2 * 3.14) * 50
  const dy = -Math.cos((value / 100.0) * 2 * 3.14) * 50 + 50
  const sweep = value > 50 ? 1 : 0
  const stroke = 24

  return (
    <svg class={props.class} viewBox="0 0 120 120">
      <path class=" opacity-10" stroke="white" stroke-width={stroke} d="M60 10 a 50 50 0 1 0 1 0 Z" />
      <path
        class="fill-none opacity-30"
        stroke="white"
        stroke-width={stroke}
        d={`M60 10 a 50 50 0 ${sweep} 1 ${dx} ${dy}`}
      />
    </svg>
  )
}
