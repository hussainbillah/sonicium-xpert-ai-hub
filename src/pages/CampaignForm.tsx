
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/DashboardLayout";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Trash2, Upload } from "lucide-react";
import MediaUploader from "@/components/MediaUploader";

const CampaignForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [fetchingCampaign, setFetchingCampaign] = useState(false);
  const [campaign, setCampaign] = useState({
    name: "",
    platform: "facebook",
    ad_copy: "",
    target_audience: "",
    budget: "100",
    status: "draft",
    start_date: null as Date | null,
    end_date: null as Date | null,
    media_urls: [] as string[],
    campaign_settings: {} as any
  });

  useEffect(() => {
    if (id) {
      fetchCampaign(id);
    }
  }, [id]);

  const fetchCampaign = async (campaignId: string) => {
    try {
      setFetchingCampaign(true);
      const { data, error } = await supabase
        .from('ad_campaigns')
        .select('*')
        .eq('id', campaignId)
        .single();
      
      if (error) throw error;
      
      if (data) {
        setCampaign({
          ...data,
          start_date: data.start_date ? new Date(data.start_date) : null,
          end_date: data.end_date ? new Date(data.end_date) : null,
        });
      }
    } catch (error) {
      console.error('Error fetching campaign:', error);
      toast({
        title: "Error",
        description: "Failed to load campaign details",
        variant: "destructive",
      });
      navigate('/campaigns');
    } finally {
      setFetchingCampaign(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!campaign.name || !campaign.platform || !campaign.ad_copy || !campaign.budget) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setLoading(true);
      
      const campaignData = {
        name: campaign.name,
        platform: campaign.platform,
        ad_copy: campaign.ad_copy,
        target_audience: campaign.target_audience,
        budget: parseFloat(campaign.budget),
        status: campaign.status,
        start_date: campaign.start_date,
        end_date: campaign.end_date,
        media_urls: campaign.media_urls,
        campaign_settings: campaign.campaign_settings || {}
      };
      
      let result;
      if (id) {
        // Update existing campaign
        result = await supabase
          .from('ad_campaigns')
          .update(campaignData)
          .eq('id', id);
      } else {
        // Create new campaign
        result = await supabase
          .from('ad_campaigns')
          .insert([campaignData]);
      }
      
      if (result.error) throw result.error;
      
      toast({
        title: "Success",
        description: id ? "Campaign updated successfully" : "Campaign created successfully"
      });
      
      navigate('/campaigns');
    } catch (error) {
      console.error('Error saving campaign:', error);
      toast({
        title: "Error",
        description: id ? "Failed to update campaign" : "Failed to create campaign",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCampaign(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setCampaign(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name: string, date: Date | null) => {
    setCampaign(prev => ({ ...prev, [name]: date }));
  };

  const handleMediaUpload = (url: string) => {
    setCampaign(prev => ({
      ...prev,
      media_urls: [...prev.media_urls, url]
    }));
  };

  const handleRemoveMedia = (urlToRemove: string) => {
    setCampaign(prev => ({
      ...prev,
      media_urls: prev.media_urls.filter(url => url !== urlToRemove)
    }));
  };

  if (fetchingCampaign) {
    return (
      <DashboardLayout>
        <div className="py-6 text-center">Loading campaign details...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            {id ? 'Edit Campaign' : 'Create Campaign'}
          </h1>
          <Button 
            variant="outline" 
            onClick={() => navigate('/campaigns')}
          >
            Cancel
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Campaign Name*</Label>
                <Input
                  id="name"
                  name="name"
                  value={campaign.name}
                  onChange={handleChange}
                  placeholder="Enter campaign name"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="platform">Platform*</Label>
                <Select
                  value={campaign.platform}
                  onValueChange={(value) => handleSelectChange('platform', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="twitter">Twitter</SelectItem>
                    <SelectItem value="google">Google Ads</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="budget">Budget ($)*</Label>
                <Input
                  id="budget"
                  name="budget"
                  type="number"
                  min="0"
                  step="0.01"
                  value={campaign.budget}
                  onChange={handleChange}
                  placeholder="Enter budget"
                  required
                />
              </div>

              <div>
                <Label htmlFor="target_audience">Target Audience</Label>
                <Input
                  id="target_audience"
                  name="target_audience"
                  value={campaign.target_audience}
                  onChange={handleChange}
                  placeholder="Describe your target audience"
                />
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={campaign.status}
                  onValueChange={(value) => handleSelectChange('status', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {campaign.start_date ? format(campaign.start_date, 'PPP') : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={campaign.start_date || undefined}
                        onSelect={(date) => handleDateChange('start_date', date)}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label>End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {campaign.end_date ? format(campaign.end_date, 'PPP') : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={campaign.end_date || undefined}
                        onSelect={(date) => handleDateChange('end_date', date)}
                        disabled={(date) => {
                          // Disable dates before start date
                          return campaign.start_date ? date < campaign.start_date : false;
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="ad_copy">Ad Copy*</Label>
                <Textarea
                  id="ad_copy"
                  name="ad_copy"
                  value={campaign.ad_copy}
                  onChange={handleChange}
                  placeholder="Write your ad copy here"
                  className="min-h-[150px]"
                  required
                />
              </div>

              <div>
                <Label>Media</Label>
                <div className="mt-2">
                  <MediaUploader onUploadSuccess={handleMediaUpload} />
                </div>

                {campaign.media_urls && campaign.media_urls.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    {campaign.media_urls.map((url, index) => (
                      <div key={index} className="relative group">
                        <img 
                          src={url} 
                          alt={`Campaign media ${index}`}
                          className="w-full h-32 object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveMedia(url)}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t flex justify-end space-x-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/campaigns')}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={loading}
              className="bg-sonicium-600 hover:bg-sonicium-700"
            >
              {loading ? (id ? 'Updating...' : 'Creating...') : (id ? 'Update Campaign' : 'Create Campaign')}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default CampaignForm;
