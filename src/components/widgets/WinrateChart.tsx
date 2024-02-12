// @ts-nocheck

import { onMount } from "solid-js"
import {
  Chart,
  Title,
  Tooltip,
  Legend,
  Colors,
  type ChartOptions,
  type ChartData,
  type ScriptableContext,
  type ChartArea,
} from "chart.js"
import { Line } from "solid-chartjs"
import "chartjs-adapter-luxon"

type WinrateChartProps = {
  labels: string[]
  data: number[]
}

export function WinrateChart(props: WinrateChartProps) {
  let canvas: HTMLCanvasElement
  onMount(() => {
    Chart.register(Title, Tooltip, Colors)
  })

  const min = Math.min(...props.data) - 5
  const max = Math.max(...props.data) + 5

  const chartData: ChartData = {
    labels: props.labels,
    datasets: [
      {
        label: "Win Rate",
        data: props.data,
        tension: 0.3,
        borderColor: function (context: ScriptableContext<"line">) {
          const chart = context.chart
          const { ctx, chartArea } = chart
          return chartArea ? getGradient(ctx, chartArea, min, max) : undefined
        },
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
        display: false,
        offset: true,
        min,
        max,
      },
      x: {
        display: true,
        type: "time",
        time: { unit: "day", tooltipFormat: "DD" },
        ticks: {
          align: "inner",
          rotation: 0,
        },
      },
    },
    plugins: {
      tooltip: {
        displayColors: false,
        callbacks: {
          label: (c) => `${c.dataset.label || ""} ${c.parsed.y} %`,
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

function getGradient(ctx: CanvasRenderingContext2D, chartArea: ChartArea, min: number, max: number) {
  let width, height, gradient
  const chartWidth = chartArea.right - chartArea.left
  const chartHeight = chartArea.bottom - chartArea.top

  const calculateStop = (value: number) => Math.min(1, Math.max(0, (value - min) / (max - min)))

  if (!gradient || width !== chartWidth || height !== chartHeight) {
    // Create the gradient because this is either the first render
    // or the size of the chart has changed
    width = chartWidth
    height = chartHeight
    gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top)
    gradient.addColorStop(0, "red")
    gradient.addColorStop(calculateStop(40), "#F30000")
    gradient.addColorStop(calculateStop(50), "yellow")
    gradient.addColorStop(calculateStop(60), "rgb(132, 204, 22)")
    gradient.addColorStop(1, "green")
  }

  return gradient
}
