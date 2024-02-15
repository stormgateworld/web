// @ts-nocheck
import { onMount } from "solid-js"
import { Chart, Colors, Title, Tooltip, type ChartOptions, type ChartData } from "chart.js"
import { Bar } from "solid-chartjs"
import type { PlayerMatchupsStatsEntry } from "../../lib/api/models/PlayerMatchupsStatsEntry"

type GameLengthProps = {
  data: Array<PlayerMatchupsStatsEntry>
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
} as const

export function GameLengthChart(props: GameLengthProps) {
  const labels = props.data.map((period) => prettyLabels[period.match_length_range as keyof typeof prettyLabels])
  const wins = props.data.map((period) => period.wins_count)
  const losses = props.data.map((period) => period.losses_count)

  onMount(() => {
    Chart.register(Title, Tooltip, Colors)
  })

  const chartData: ChartData = {
    labels: labels,
    datasets: [
      {
        label: "Wins",
        data: wins,
        backgroundColor: "#55EA00",
      },
      {
        label: "Losses",
        data: losses,
        backgroundColor: "#EA0000",
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
    maxBarThickness: 50,
    plugins: {
      title: {
        display: false,
      },
      legend: {
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
      <Bar data={chartData} options={chartOptions} height={100} width={300} />
    </div>
  )
}
