
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/DashboardLayout";
import SEOAuditTab from "@/components/seo/SEOAuditTab";
import CampaignsDashboard from "@/components/marketing/CampaignsDashboard";
import AnalysisDashboard from "@/components/marketing/AnalysisDashboard";
import { useToast } from "@/components/ui/use-toast";

const MarketingDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("seo");
  const { toast } = useToast();

  const handleExportReport = () => {
    toast({
      title: "Report Export Started",
      description: "Your marketing report is being generated. It will be ready for download soon.",
    });
  };

  return (
    <DashboardLayout>
      <div className="container py-6">
        <h1 className="text-3xl font-bold tracking-tight mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
          AI-Powered Marketing & SEO Platform
        </h1>

        <Tabs defaultValue="seo" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="seo">SEO Dashboard</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns Dashboard</TabsTrigger>
            <TabsTrigger value="analysis">Analysis Dashboard</TabsTrigger>
          </TabsList>
          
          <TabsContent value="seo">
            <SEOAuditTab />
          </TabsContent>
          
          <TabsContent value="campaigns">
            <CampaignsDashboard />
          </TabsContent>
          
          <TabsContent value="analysis">
            <AnalysisDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default MarketingDashboard;
