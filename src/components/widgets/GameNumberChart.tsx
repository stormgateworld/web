// @ts-nocheck

import { onMount } from "solid-js"
import { Chart, Title, Tooltip, Colors, TimeScale, type ChartOptions, type ChartData } from "chart.js"
import { Bar } from "solid-chartjs"
import "chartjs-adapter-luxon"

type GameNumberChartProps = {
  labels: string[]
  data: number[]
}

const longNumberFormatter = new Intl.NumberFormat("en-us")

export function GameNumberChart(props: GameNumberChartProps) {
  let canvas: HTMLCanvasElement
  onMount(() => {
    Chart.register(Title, Tooltip, Colors, TimeScale)
  })

  const chartData: ChartData = {
    labels: props.labels,
    datasets: [
      {
        label: "Games",
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
      x: {
        type: "time",
        time: { unit: "day", tooltipFormat: "DD" },
      },
    },
    plugins: {
      tooltip: {
        displayColors: false,
        callbacks: {
          label: (c) => `${longNumberFormatter.format(c.parsed.y)} games`,
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
