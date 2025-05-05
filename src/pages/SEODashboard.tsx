
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/DashboardLayout";
import GlobalFilter from "@/components/seo/GlobalFilter";
import SEOHealthScore from "@/components/seo/SEOHealthScore";
import SEOAuditTab from "@/components/seo/SEOAuditTab";
import KeywordResearchTab from "@/components/seo/KeywordResearchTab";
import CompetitorAnalysisTab from "@/components/seo/CompetitorAnalysisTab";
import TrafficAnalysisTab from "@/components/seo/TrafficAnalysisTab";
import BacklinkAnalysisTab from "@/components/seo/BacklinkAnalysisTab";
import { useToast } from "@/components/ui/use-toast";

const SEODashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("audit");
  const { toast } = useToast();

  // Health scores for different aspects of SEO
  const healthScores = {
    audit: 68,
    keyword: 75,
    competitor: 62,
    traffic: 83,
    backlink: 71,
  };

  const handleFilterChange = (filters: any) => {
    toast({
      title: "Filters applied",
      description: `Date: ${filters.dateRange.from?.toLocaleDateString()} to ${filters.dateRange.to?.toLocaleDateString()}, Country: ${filters.country}, Device: ${filters.device}`,
    });
  };

  return (
    <DashboardLayout>
      <div className="container py-6">
        <h1 className="text-3xl font-bold tracking-tight mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
          SEO Dashboard
        </h1>

        <GlobalFilter onFilterChange={handleFilterChange} />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="md:col-span-1">
            <SEOHealthScore 
              score={activeTab === "audit" ? healthScores.audit : 
                    activeTab === "keyword" ? healthScores.keyword :
                    activeTab === "competitor" ? healthScores.competitor :
                    activeTab === "traffic" ? healthScores.traffic :
                    healthScores.backlink}
              label={activeTab === "audit" ? "SEO Health Score" : 
                    activeTab === "keyword" ? "Keyword Effectiveness" :
                    activeTab === "competitor" ? "Competitive Position" :
                    activeTab === "traffic" ? "Traffic Performance" :
                    "Backlink Quality"}
            />
          </div>

          <div className="md:col-span-4">
            <Tabs defaultValue="audit" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-5 mb-8">
                <TabsTrigger value="audit">SEO Audit</TabsTrigger>
                <TabsTrigger value="keyword">Keyword Research</TabsTrigger>
                <TabsTrigger value="competitor">Competitor Analysis</TabsTrigger>
                <TabsTrigger value="traffic">Traffic Analysis</TabsTrigger>
                <TabsTrigger value="backlink">Backlink Analysis</TabsTrigger>
              </TabsList>
              
              <TabsContent value="audit">
                <SEOAuditTab />
              </TabsContent>
              
              <TabsContent value="keyword">
                <KeywordResearchTab />
              </TabsContent>
              
              <TabsContent value="competitor">
                <CompetitorAnalysisTab />
              </TabsContent>
              
              <TabsContent value="traffic">
                <TrafficAnalysisTab />
              </TabsContent>

              <TabsContent value="backlink">
                <BacklinkAnalysisTab />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SEODashboard;
