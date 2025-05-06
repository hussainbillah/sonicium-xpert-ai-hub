
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import DashboardLayout from "@/components/DashboardLayout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import NewCampaignForm from "@/components/marketing/campaigns/NewCampaignForm";
import { parse, format } from "date-fns";
import { getMockData } from "@/utils/mockDatabaseHelper";

const CampaignForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [campaign, setCampaign] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode) {
      fetchCampaign();
    } else {
      setLoading(false);
    }
  }, [id]);

  const fetchCampaign = async () => {
    try {
      setLoading(true);
      
      // Use mock data until database tables are set up
      const mockCampaigns = getMockData('campaigns');
      const foundCampaign = mockCampaigns.find((c: any) => c.id === id);
      
      if (foundCampaign) {
        // Add mock data for fields that might be needed
        const enhancedCampaign = {
          ...foundCampaign,
          ad_copy: "Mock ad copy text",
          target_audience: "Adults 25-45",
          media_urls: [],
          campaign_settings: {},
          start_date: new Date(),
          end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        };
        
        setCampaign(enhancedCampaign);
      } else {
        toast({
          title: "Error",
          description: "Campaign not found",
          variant: "destructive",
        });
        navigate("/campaigns");
      }

      // When database tables are set up, uncomment this code:
      /*
      const { data, error } = await supabase
        .from('ad_campaigns')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      if (!data) {
        toast({
          title: "Error", 
          description: "Campaign not found",
          variant: "destructive"
        });
        navigate("/campaigns");
        return;
      }
      
      // Convert string dates to Date objects
      if (data.start_date) {
        data.start_date = new Date(data.start_date);
      }
      if (data.end_date) {
        data.end_date = new Date(data.end_date);
      }
      
      setCampaign(data);
      */
    } catch (error) {
      console.error('Error fetching campaign:', error);
      toast({
        title: "Error",
        description: "Failed to load campaign",
        variant: "destructive",
      });
      navigate("/campaigns");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Simulate saving for now
      toast({
        title: "Success",
        description: isEditMode ? "Campaign updated successfully" : "Campaign created successfully"
      });
      navigate("/campaigns");

      // When database tables are set up, uncomment this code:
      /*
      // Prepare campaign data
      const campaignData = {
        name: campaign.name,
        platform: campaign.platform,
        ad_copy: campaign.ad_copy,
        target_audience: campaign.target_audience,
        budget: campaign.budget,
        status: campaign.status,
        start_date: campaign.start_date,
        end_date: campaign.end_date,
        media_urls: campaign.media_urls || [],
        campaign_settings: campaign.campaign_settings || {},
      };
      
      if (isEditMode) {
        // Update existing campaign
        const { error } = await supabase
          .from('ad_campaigns')
          .update(campaignData)
          .eq('id', id);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Campaign updated successfully"
        });
      } else {
        // Create new campaign
        const { error } = await supabase
          .from('ad_campaigns')
          .insert([campaignData]);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Campaign created successfully"
        });
      }
      
      navigate("/campaigns");
      */
    } catch (error) {
      console.error('Error saving campaign:', error);
      toast({
        title: "Error",
        description: "Failed to save campaign",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    navigate("/campaigns");
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-10">
          <p>Loading campaign data...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="py-6">
        <h1 className="text-2xl font-bold mb-6">
          {isEditMode ? "Edit Campaign" : "Create New Campaign"}
        </h1>
        
        <NewCampaignForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </DashboardLayout>
  );
};

export default CampaignForm;
