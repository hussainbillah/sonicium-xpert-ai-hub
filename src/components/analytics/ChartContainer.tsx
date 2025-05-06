
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, BarChart, PieChart } from "@/components/ui/custom-chart";

interface ChartData {
  name: string;
  value: number;
}

interface ChartContainerProps {
  title: string;
  chartType: "line" | "bar" | "pie";
  data: ChartData[] | null;
  color?: string;
  height?: string;
  className?: string;
}

const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  chartType,
  data,
  color = "#4f46e5",
  height = "h-80",
  className,
}) => {
  if (!data) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className={height}>
          <p>No data available.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className={height}>
        {chartType === "line" && (
          <LineChart 
            data={data}
            lines={[{ dataKey: "value", stroke: color, name: title }]}
            xAxisDataKey="name"
          />
        )}
        {chartType === "bar" && (
          <BarChart 
            data={data}
            bars={[{ dataKey: "value", fill: color, name: title }]}
            xAxisDataKey="name"
          />
        )}
        {chartType === "pie" && (
          <PieChart 
            data={data}
            dataKey="value"
            nameKey="name"
            colors={[color, "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6"]}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default ChartContainer;
