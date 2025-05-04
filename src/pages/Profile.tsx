
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Facebook, Twitter, Linkedin, Globe, Loader2, Upload } from "lucide-react";

interface UserProfile {
  id: string;
  full_name: string | null;
  website: string | null;
  avatar_url: string | null;
  company: string | null;
  social_links: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
}

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setProfile(data);
      } else {
        // Create a new profile if it doesn't exist
        const newProfile = {
          id: user!.id,
          full_name: user?.user_metadata?.full_name || null,
          website: null,
          avatar_url: null,
          company: null,
          social_links: {},
        };
        
        setProfile(newProfile);
        
        // Save the new profile
        const { error: insertError } = await supabase
          .from('profiles')
          .insert([newProfile]);
          
        if (insertError) throw insertError;
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Error",
        description: "Failed to load profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('social_')) {
      const socialNetwork = name.split('_')[1];
      setProfile(prev => 
        prev ? {
          ...prev,
          social_links: {
            ...prev.social_links,
            [socialNetwork]: value
          }
        } : null
      );
    } else {
      setProfile(prev => prev ? { ...prev, [name]: value } : null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!profile) return;
    
    try {
      setSaving(true);
      
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: profile.full_name,
          website: profile.website,
          company: profile.company,
          social_links: profile.social_links || {},
          updated_at: new Date()
        })
        .eq('id', user?.id);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Profile updated successfully"
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const filePath = `avatars/${user?.id}.${fileExt}`;
    
    try {
      setAvatarUploading(true);
      
      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file, { upsert: true });
      
      if (uploadError) throw uploadError;
      
      // Get the public URL
      const { data: publicUrlData } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);
      
      if (publicUrlData && publicUrlData.publicUrl) {
        // Update the profile with the new avatar URL
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ avatar_url: publicUrlData.publicUrl })
          .eq('id', user?.id);
        
        if (updateError) throw updateError;
        
        // Update local state
        setProfile(prev => prev ? { ...prev, avatar_url: publicUrlData.publicUrl } : null);
        
        toast({
          title: "Success",
          description: "Profile picture updated"
        });
      }
    } catch (error: any) {
      console.error('Error uploading avatar:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update profile picture",
        variant: "destructive",
      });
    } finally {
      setAvatarUploading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-10">
          <p>Loading profile...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!profile) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center py-10">
          <p className="mb-4">Profile not found</p>
          <Button onClick={() => navigate('/dashboard')}>
            Return to Dashboard
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="py-6">
        <h1 className="text-2xl font-bold mb-6">User Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="relative group">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={profile.avatar_url || undefined} />
                  <AvatarFallback>
                    {profile.full_name?.charAt(0) || user?.email?.charAt(0)?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>

                <label
                  htmlFor="avatar-upload"
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
                >
                  {avatarUploading ? (
                    <Loader2 className="h-6 w-6 text-white animate-spin" />
                  ) : (
                    <Upload className="h-6 w-6 text-white" />
                  )}
                </label>
                <Input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                  disabled={avatarUploading}
                />
              </div>

              <p className="font-medium">{profile.full_name}</p>
              <p className="text-sm text-gray-500">{user?.email}</p>
              
              {profile.website && (
                <a 
                  href={profile.website.startsWith('http') ? profile.website : `https://${profile.website}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center mt-2 text-sm text-sonicium-600 hover:underline"
                >
                  <Globe className="h-4 w-4 mr-1" />
                  {profile.website}
                </a>
              )}
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input
                      id="full_name"
                      name="full_name"
                      value={profile.full_name || ''}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      name="company"
                      value={profile.company || ''}
                      onChange={handleChange}
                      placeholder="Enter your company name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={user?.email || ''}
                      disabled
                      readOnly
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      name="website"
                      value={profile.website || ''}
                      onChange={handleChange}
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-3">Social Links</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Facebook className="h-5 w-5 text-blue-600 mr-2" />
                      <Input
                        name="social_facebook"
                        value={profile.social_links?.facebook || ''}
                        onChange={handleChange}
                        placeholder="Facebook profile URL"
                      />
                    </div>
                    <div className="flex items-center">
                      <Twitter className="h-5 w-5 text-blue-400 mr-2" />
                      <Input
                        name="social_twitter"
                        value={profile.social_links?.twitter || ''}
                        onChange={handleChange}
                        placeholder="Twitter profile URL"
                      />
                    </div>
                    <div className="flex items-center">
                      <Linkedin className="h-5 w-5 text-blue-700 mr-2" />
                      <Input
                        name="social_linkedin"
                        value={profile.social_links?.linkedin || ''}
                        onChange={handleChange}
                        placeholder="LinkedIn profile URL"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button 
                    type="submit" 
                    className="bg-sonicium-600 hover:bg-sonicium-700"
                    disabled={saving}
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
