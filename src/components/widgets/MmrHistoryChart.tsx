// @ts-nocheck

import { onMount } from "solid-js"
import { Chart, Title, Tooltip, Colors, TimeScale, type ChartOptions, type ChartData } from "chart.js"
import { Line } from "solid-chartjs"
import "chartjs-adapter-date-fns"

type MmrHistoryChartProps = {
  labels: string[]
  data: number[]
}

const longNumberFormatter = new Intl.NumberFormat("en-us")

export function MmrHistoryChart(props: MmrHistoryChartProps) {
  let canvas: HTMLCanvasElement
  onMount(() => {
    Chart.register(Title, Tooltip, Colors, TimeScale)
  })

  const chartData: ChartData = {
    labels: props.labels,
    datasets: [
      {
        label: "MMR",
        data: props.data,
        tension: 0.3,
        borderColor: "#9E9E9E",
        pointRadius: 5,
        pointHoverRadius: 2,
        pointBorderColor: "transparent",
      },
    ],
  }

  const chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    interaction: {
      intersect: false,
      mode: "index",
    },
    scales: {
      y: {
        ticks: {
          precision: 0,
        },
        offset: true,
      },
      x: {
        type: "time",
        time: { unit: "day", tooltipFormat: "d MMM, y" },
      },
    },
    plugins: {
      tooltip: {
        displayColors: false,
        callbacks: {
          label: (c) => `MMR: ${Math.round(c.parsed.y)}`,
        },
      },
    },
  }

  return (
    <div class="relative w-full overflow-hidden">
      <Line data={chartData} options={chartOptions} height={100} width={300} ref={(c) => (canvas = c)} />
    </div>
  )
}
