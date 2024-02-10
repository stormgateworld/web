// @ts-nocheck

import { onMount } from "solid-js"
import { BarElement, Chart, Colors, Title, Tooltip, type ChartOptions, type ChartData } from "chart.js"
import { DefaultChart } from "solid-chartjs"

Chart.register(Title, Tooltip, Colors, BarElement)

type GameLengthProps = {
  data: Array[]
}

const prettyLabels = {
  "0-120": "<2m",
  "121-240": "2-4m",
  "241-360": "4-8m",
  "361-480": "8-10m",
  "481-600": "10-12m",
  "601-720": "12-14m",
  "721-840": "14-16m",
  "841-960": "16-18m",
  "961-1080": "18-20m",
  "1081-1200": "20-22m",
  "1320+": "22m+",
}

export function GameLengthChart(props: GameLengthChartProps) {
  var labels = []
  var wins = []
  var losses = []
  var games = []
  props.data.map((period) => labels.push(prettyLabels[period.match_length_range]))
  props.data.map((period) => wins.push(period.wins_count))
  props.data.map((period) => losses.push(period.losses_count))
  props.data.map((period) => games.push(period.matches_count))
  let canvas: HTMLCanvasElement
  onMount(() => {
    Chart.register(Title, Tooltip, Colors)
  })

  const min = 0
  const max = Math.max(...games)

  const chartData: ChartData = {
    labels: labels,
    datasets: [
      {
        label: "Wins",
        data: wins,
        backgroundColor: "green",
      },
      {
        label: "Losses",
        data: losses,
        backgroundColor: "red",
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
    plugins: {
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  }

  return (
    <div class="relative w-full overflow-hidden">
      <DefaultChart
        type="bar"
        data={chartData}
        options={chartOptions}
        height={100}
        width={300}
        ref={(c) => (canvas = c)}
      />
    </div>
  )
}
