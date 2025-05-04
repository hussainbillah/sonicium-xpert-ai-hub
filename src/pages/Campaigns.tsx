
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PlusCircle, MoreVertical, Edit, Trash2, Play, Pause } from "lucide-react";
import { format } from "date-fns";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/DashboardLayout";
import { useToast } from "@/components/ui/use-toast";

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchCampaigns();
    }
  }, [user]);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ad_campaigns')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setCampaigns(data || []);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      toast({
        title: "Error",
        description: "Failed to load campaigns",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusToggle = async (campaign: any) => {
    const newStatus = campaign.status === 'active' ? 'paused' : 'active';
    
    try {
      const { error } = await supabase
        .from('ad_campaigns')
        .update({ status: newStatus })
        .eq('id', campaign.id);
      
      if (error) throw error;
      
      // Update the local state
      setCampaigns(campaigns.map((c: any) => 
        c.id === campaign.id ? { ...c, status: newStatus } : c
      ));
      
      toast({
        title: "Success",
        description: `Campaign ${newStatus === 'active' ? 'activated' : 'paused'} successfully`
      });
    } catch (error) {
      console.error('Error updating campaign status:', error);
      toast({
        title: "Error",
        description: "Failed to update campaign status",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this campaign?")) return;
    
    try {
      const { error } = await supabase
        .from('ad_campaigns')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      // Remove from local state
      setCampaigns(campaigns.filter((campaign: any) => campaign.id !== id));
      
      toast({
        title: "Success",
        description: "Campaign deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting campaign:', error);
      toast({
        title: "Error",
        description: "Failed to delete campaign",
        variant: "destructive",
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="py-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Ad Campaigns</h1>
          <Button 
            onClick={() => navigate('/campaigns/create')} 
            className="bg-sonicium-600 hover:bg-sonicium-700"
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Create Campaign
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-10">
            <p>Loading campaigns...</p>
          </div>
        ) : campaigns.length === 0 ? (
          <div className="text-center py-10">
            <h2 className="text-xl font-medium mb-2">No campaigns yet</h2>
            <p className="text-muted-foreground mb-6">Create your first campaign to start advertising</p>
            <Button 
              onClick={() => navigate('/campaigns/create')} 
              className="bg-sonicium-600 hover:bg-sonicium-700"
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Create Campaign
            </Button>
          </div>
        ) : (
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaigns.map((campaign: any) => (
                  <TableRow key={campaign.id}>
                    <TableCell className="font-medium">{campaign.name}</TableCell>
                    <TableCell>{campaign.platform}</TableCell>
                    <TableCell>${campaign.budget}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        campaign.status === 'active' ? 'bg-green-100 text-green-800' : 
                        campaign.status === 'paused' ? 'bg-yellow-100 text-yellow-800' : 
                        campaign.status === 'draft' ? 'bg-gray-100 text-gray-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>
                      {campaign.created_at ? format(new Date(campaign.created_at), 'MMM d, yyyy') : 'N/A'}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => navigate(`/campaigns/${campaign.id}`)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusToggle(campaign)}>
                            {campaign.status === 'active' ? (
                              <>
                                <Pause className="mr-2 h-4 w-4" />
                                Pause
                              </>
                            ) : (
                              <>
                                <Play className="mr-2 h-4 w-4" />
                                Activate
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDelete(campaign.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Campaigns;
