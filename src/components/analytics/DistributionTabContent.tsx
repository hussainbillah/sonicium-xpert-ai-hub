
import React from "react";
import ChartContainer from "./ChartContainer";

interface DistributionTabContentProps {
  type: "platforms" | "devices";
  analyticsData: any;
}

const DistributionTabContent: React.FC<DistributionTabContentProps> = ({ type, analyticsData }) => {
  const data = analyticsData?.[type];
  const title = type === "platforms" ? "Platform Distribution" : "Device Distribution";
  
  const chartData = data 
    ? data.labels.map((label: string, index: number) => ({
        name: label,
        value: data.data[index]
      }))
    : null;

  return (
    <ChartContainer
      title={title}
      chartType="pie"
      data={chartData}
      color={type === "platforms" ? "#4f46e5" : "#22c55e"}
    />
  );
};

export default DistributionTabContent;
