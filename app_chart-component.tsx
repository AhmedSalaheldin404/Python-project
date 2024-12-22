'use client'

import { useRef } from 'react'
import { Bar, BarChart, Line, LineChart, Pie, PieChart, Tooltip, XAxis, YAxis } from 'recharts'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface ChartComponentProps {
  chartType: 'pie' | 'bar' | 'line'
  data: { label: string; value: number }[]
}

export function ChartComponent({ chartType, data }: ChartComponentProps) {
  const chartRef = useRef<HTMLDivElement>(null)

  const exportChart = () => {
    if (chartRef.current) {
      const svgElement = chartRef.current.querySelector('svg')
      if (svgElement) {
        const svgData = new XMLSerializer().serializeToString(svgElement)
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        const img = new Image()
        img.onload = () => {
          canvas.width = img.width
          canvas.height = img.height
          ctx?.drawImage(img, 0, 0)
          const pngFile = canvas.toDataURL('image/png')
          const downloadLink = document.createElement('a')
          downloadLink.download = 'chart.png'
          downloadLink.href = pngFile
          downloadLink.click()
        }
        img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)))
      }
    }
  }

  const renderChart = () => {
    switch (chartType) {
      case 'pie':
        return (
          <PieChart width={400} height={400}>
            <Pie data={data} dataKey="value" nameKey="label" cx="50%" cy="50%" outerRadius={80} fill="var(--color-primary)" label />
            <ChartTooltip content={<ChartTooltipContent />} />
          </PieChart>
        )
      case 'bar':
        return (
          <BarChart width={400} height={300} data={data}>
            <XAxis dataKey="label" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="value" fill="var(--color-primary)" />
          </BarChart>
        )
      case 'line':
        return (
          <LineChart width={400} height={300} data={data}>
            <XAxis dataKey="label" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line type="monotone" dataKey="value" stroke="var(--color-primary)" />
          </LineChart>
        )
    }
  }

  return (
    <Card>
      <CardContent>
        <ChartContainer config={{}} className="h-[400px]">
          <div ref={chartRef}>
            {renderChart()}
          </div>
        </ChartContainer>
        <Button onClick={exportChart} className="mt-4">Export as PNG</Button>
      </CardContent>
    </Card>
  )
}

