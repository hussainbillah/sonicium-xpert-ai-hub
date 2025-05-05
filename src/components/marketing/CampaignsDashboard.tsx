
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import NewCampaignForm from './campaigns/NewCampaignForm';
import CampaignFilterBar from './campaigns/CampaignFilterBar';
import CampaignTable from './campaigns/CampaignTable';
import ChartSection from './campaigns/ChartSection';
import { campaignData } from './campaigns/CampaignData';
import { useToast } from "@/components/ui/use-toast";

const CampaignsDashboard: React.FC = () => {
  const [isNewCampaignOpen, setIsNewCampaignOpen] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would handle the submission to create a new campaign
    setIsNewCampaignOpen(false);
    
    toast({
      title: "Success",
      description: "Campaign created successfully!",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Campaigns & Ad Center</h2>
          <p className="text-muted-foreground mt-1">Manage your marketing campaigns and analyze performance</p>
        </div>
        
        <Dialog open={isNewCampaignOpen} onOpenChange={setIsNewCampaignOpen}>
          <DialogTrigger asChild>
            <Button className="bg-sonicium-600 hover:bg-sonicium-700">
              <PlusCircle className="mr-2 h-5 w-5" /> Create New Campaign
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Create New Campaign</DialogTitle>
              <DialogDescription>
                Configure your campaign settings and targeting to reach the right audience.
              </DialogDescription>
            </DialogHeader>
            
            <NewCampaignForm 
              onSubmit={handleSubmit} 
              onCancel={() => setIsNewCampaignOpen(false)} 
            />
          </DialogContent>
        </Dialog>
      </div>
      
      <CampaignFilterBar campaignCount={campaignData.length} />
      
      <CampaignTable campaigns={campaignData} />
      
      <ChartSection />
    </div>
  );
};

export default CampaignsDashboard;
