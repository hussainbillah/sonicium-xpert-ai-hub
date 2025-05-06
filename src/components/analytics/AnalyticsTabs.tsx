
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MetricsTabContent from "./MetricsTabContent";
import DistributionTabContent from "./DistributionTabContent";
import DemographicsTabContent from "./DemographicsTabContent";
import AnalyticsLoading from "./AnalyticsLoading";

interface AnalyticsTabsProps {
  loading: boolean;
  analyticsData: any;
}

const AnalyticsTabs: React.FC<AnalyticsTabsProps> = ({ loading, analyticsData }) => {
  return (
    <Tabs defaultValue="impressions" className="space-y-4">
      <TabsList>
        <TabsTrigger value="impressions">Impressions</TabsTrigger>
        <TabsTrigger value="clicks">Clicks</TabsTrigger>
        <TabsTrigger value="conversions">Conversions</TabsTrigger>
        <TabsTrigger value="platforms">Platforms</TabsTrigger>
        <TabsTrigger value="devices">Devices</TabsTrigger>
        <TabsTrigger value="demographics">Demographics</TabsTrigger>
      </TabsList>

      {loading ? (
        <AnalyticsLoading />
      ) : (
        <>
          <TabsContent value="impressions" className="space-y-4">
            <MetricsTabContent type="impressions" analyticsData={analyticsData} />
          </TabsContent>

          <TabsContent value="clicks" className="space-y-4">
            <MetricsTabContent type="clicks" analyticsData={analyticsData} />
          </TabsContent>

          <TabsContent value="conversions" className="space-y-4">
            <MetricsTabContent type="conversions" analyticsData={analyticsData} />
          </TabsContent>

          <TabsContent value="platforms" className="space-y-4">
            <DistributionTabContent type="platforms" analyticsData={analyticsData} />
          </TabsContent>

          <TabsContent value="devices" className="space-y-4">
            <DistributionTabContent type="devices" analyticsData={analyticsData} />
          </TabsContent>

          <TabsContent value="demographics" className="space-y-4">
            <DemographicsTabContent analyticsData={analyticsData} />
          </TabsContent>
        </>
      )}
    </Tabs>
  );
};

export default AnalyticsTabs;
