
import React from "react";
import ChartContainer from "./ChartContainer";

interface DemographicsTabContentProps {
  analyticsData: any;
}

const DemographicsTabContent: React.FC<DemographicsTabContentProps> = ({ analyticsData }) => {
  const ageData = analyticsData?.demographics?.age;
  const genderData = analyticsData?.demographics?.gender;
  
  const ageChartData = ageData 
    ? ageData.labels.map((label: string, index: number) => ({
        name: label,
        value: ageData.data[index]
      }))
    : null;

  const genderChartData = genderData 
    ? genderData.labels.map((label: string, index: number) => ({
        name: label,
        value: genderData.data[index]
      }))
    : null;

  return (
    <div className="space-y-4">
      <ChartContainer
        title="Age Distribution"
        chartType="bar"
        data={ageChartData}
        color="#4f46e5"
      />
      <ChartContainer
        title="Gender Distribution"
        chartType="bar"
        data={genderChartData}
        color="#22c55e"
      />
    </div>
  );
};

export default DemographicsTabContent;
