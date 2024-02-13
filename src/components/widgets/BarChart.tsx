// @ts-nocheck

import { onMount } from "solid-js"
import { Chart, Title, Tooltip, Colors, TimeScale, type ChartOptions, type ChartData } from "chart.js"
import { Bar } from "solid-chartjs"
import "chartjs-adapter-date-fns"

type BarChartProps = {
  labels: string[]
  data: number[]
  labelObjectName: string
  useTimeScale?: boolean
}

const longNumberFormatter = new Intl.NumberFormat("en-us")

export function BarChart(props: BarChartProps) {
  let canvas: HTMLCanvasElement
  onMount(() => {
    Chart.register(Title, Tooltip, Colors, TimeScale)
  })

  const chartData: ChartData = {
    labels: props.labels,
    datasets: [
      {
        data: props.data,
        backgroundColor: "#5EC269",
      },
    ],
  }

  const chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    animation: false,
    interaction: {
      intersect: false,
      mode: "index",
    },
    scales: {
      x: props.useTimeScale
        ? {
            type: "time",
            time: { unit: "day", tooltipFormat: "d MMM, y" },
          }
        : {},
    },
    plugins: {
      tooltip: {
        displayColors: false,
        callbacks: {
          label: (c) => `${longNumberFormatter.format(c.parsed.y)} ${props.labelObjectName}`,
        },
      },
    },
  }

  return (
    <div class="relative w-full overflow-hidden">
      <Bar data={chartData} options={chartOptions} height={100} width={300} ref={(c) => (canvas = c)} />
    </div>
  )
}
