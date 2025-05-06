
import React from "react";
import ChartContainer from "./ChartContainer";

interface MetricsTabContentProps {
  type: "impressions" | "clicks" | "conversions";
  analyticsData: any;
}

const MetricsTabContent: React.FC<MetricsTabContentProps> = ({ type, analyticsData }) => {
  const data = analyticsData?.[type];
  let title = "";
  let color = "";

  switch (type) {
    case "impressions":
      title = "Impressions Over Time";
      color = "#4f46e5";
      break;
    case "clicks":
      title = "Clicks Over Time";
      color = "#22c55e";
      break;
    case "conversions":
      title = "Conversions Over Time";
      color = "#f59e0b";
      break;
  }

  const chartData = data 
    ? data.labels.map((label: string, index: number) => ({
        name: label,
        value: data.data[index]
      }))
    : null;

  return (
    <ChartContainer
      title={title}
      chartType="line"
      data={chartData}
      color={color}
    />
  );
};

export default MetricsTabContent;
