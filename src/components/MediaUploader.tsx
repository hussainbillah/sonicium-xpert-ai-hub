
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface MediaUploaderProps {
  onUploadSuccess: (url: string) => void;
}

const MediaUploader: React.FC<MediaUploaderProps> = ({ onUploadSuccess }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `${user?.id}/${fileName}`;
    
    try {
      setUploading(true);
      setUploadProgress(0);
      
      // Use a manual progress tracking approach
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = async () => {
        try {
          const { data, error } = await supabase.storage
            .from('media')
            .upload(filePath, file, {
              upsert: true
            });
          
          if (error) throw error;
          
          // Get the public URL
          const { data: publicUrlData } = supabase.storage
            .from('media')
            .getPublicUrl(filePath);
          
          if (publicUrlData && publicUrlData.publicUrl) {
            onUploadSuccess(publicUrlData.publicUrl);
            toast({
              title: "Upload successful",
              description: "Media file has been uploaded"
            });
          }
        } catch (error: any) {
          console.error('Error uploading file:', error);
          toast({
            title: "Upload failed",
            description: error.message || "Failed to upload file",
            variant: "destructive",
          });
        } finally {
          setUploading(false);
          setUploadProgress(0);
        }
      };
      
      // Simulate progress for better UX
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress = Math.min(prev + 5, 95);
          if (newProgress === 95) clearInterval(interval);
          return newProgress;
        });
      }, 100);
    } catch (error: any) {
      console.error('Error reading file:', error);
      toast({
        title: "Upload failed",
        description: error.message || "Failed to read file",
        variant: "destructive",
      });
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="file-upload"
          className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer ${
            uploading ? 'bg-gray-50' : 'hover:bg-gray-50'
          } transition-colors`}
        >
          {uploading ? (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Loader2 className="h-10 w-10 text-sonicium-600 animate-spin mb-2" />
              <p className="text-sm text-gray-500">Uploading... {uploadProgress}%</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="h-10 w-10 text-gray-400 mb-2" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">Images (PNG, JPG, GIF)</p>
            </div>
          )}
          <Input
            id="file-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </label>
      </div>
    </div>
  );
};

export default MediaUploader;
