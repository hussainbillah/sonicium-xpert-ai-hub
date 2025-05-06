
import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import AnalyticsHeader from "@/components/analytics/AnalyticsHeader";
import AnalyticsTabs from "@/components/analytics/AnalyticsTabs";
import { fetchAnalyticsData } from "@/utils/analyticsHelper";

const Analytics = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('30days');
  const [analyticsData, setAnalyticsData] = useState<any>(null);

  useEffect(() => {
    if (user) {
      fetchAnalytics();
    }
  }, [user, timeframe]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      
      // Mock analytics data with a delay to simulate API call
      setTimeout(() => {
        const data = fetchAnalyticsData(timeframe);
        setAnalyticsData(data);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="py-6 space-y-6">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        
        <AnalyticsHeader 
          timeframe={timeframe} 
          setTimeframe={setTimeframe} 
        />

        <AnalyticsTabs 
          loading={loading} 
          analyticsData={analyticsData} 
        />
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
