'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ChartComponent } from './chart-component'

export default function ChartVisualizer() {
  const [chartType, setChartType] = useState<'pie' | 'bar' | 'line'>('bar')
  const [data, setData] = useState<{ label: string; value: number }[]>([
    { label: 'A', value: 10 },
    { label: 'B', value: 20 },
    { label: 'C', value: 30 },
  ])

  const handleDataChange = (index: number, field: 'label' | 'value', value: string) => {
    const newData = [...data]
    if (field === 'label') {
      newData[index].label = value
    } else {
      newData[index].value = Number(value)
    }
    setData(newData)
  }

  const addDataPoint = () => {
    setData([...data, { label: '', value: 0 }])
  }

  const removeDataPoint = (index: number) => {
    const newData = [...data]
    newData.splice(index, 1)
    setData(newData)
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Chart Visualizer</CardTitle>
          <CardDescription>Choose a chart type and enter your data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <RadioGroup defaultValue="bar" onValueChange={(value) => setChartType(value as 'pie' | 'bar' | 'line')}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bar" id="bar" />
                <Label htmlFor="bar">Bar Chart</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pie" id="pie" />
                <Label htmlFor="pie">Pie Chart</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="line" id="line" />
                <Label htmlFor="line">Line Chart</Label>
              </div>
            </RadioGroup>

            <div className="space-y-2">
              {data.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    placeholder="Label"
                    value={item.label}
                    onChange={(e) => handleDataChange(index, 'label', e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Value"
                    value={item.value}
                    onChange={(e) => handleDataChange(index, 'value', e.target.value)}
                  />
                  <Button variant="destructive" onClick={() => removeDataPoint(index)}>Remove</Button>
                </div>
              ))}
              <Button onClick={addDataPoint}>Add Data Point</Button>
            </div>

            <ChartComponent chartType={chartType} data={data} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

