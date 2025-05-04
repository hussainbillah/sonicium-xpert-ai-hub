
import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2, Search, Upload, Trash2, Info } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import MediaUploader from "@/components/MediaUploader";

interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  createdAt: string;
}

const Media = () => {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [showUploader, setShowUploader] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchMediaFiles();
    }
  }, [user]);

  const fetchMediaFiles = async () => {
    try {
      setLoading(true);

      // Get all files from the user's folder
      const { data, error } = await supabase.storage
        .from('media')
        .list(`${user!.id}/`, {
          sortBy: { column: 'created_at', order: 'desc' },
        });

      if (error) throw error;

      const mediaData: MediaFile[] = [];

      // Process each file and get its URL
      if (data) {
        for (const file of data) {
          if (file.name !== '.emptyFolderPlaceholder') {
            const { data: urlData } = supabase.storage
              .from('media')
              .getPublicUrl(`${user!.id}/${file.name}`);

            if (urlData) {
              mediaData.push({
                id: file.id,
                name: file.name,
                url: urlData.publicUrl,
                type: file.metadata?.mimetype || 'image/jpeg',
                size: file.metadata?.size || 0,
                createdAt: file.created_at
              });
            }
          }
        }
      }

      setMediaFiles(mediaData);
    } catch (error) {
      console.error('Error fetching media files:', error);
      toast({
        title: "Error",
        description: "Failed to load media files",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (fileId: string) => {
    setSelectedFiles((prev) => {
      if (prev.includes(fileId)) {
        return prev.filter((id) => id !== fileId);
      } else {
        return [...prev, fileId];
      }
    });
  };

  const handleDeleteSelected = async () => {
    if (selectedFiles.length === 0) return;

    if (!window.confirm(`Are you sure you want to delete ${selectedFiles.length} selected files?`)) {
      return;
    }

    try {
      setLoading(true);

      const filesToDelete = mediaFiles
        .filter((file) => selectedFiles.includes(file.id))
        .map((file) => `${user!.id}/${file.name}`);

      const { error } = await supabase.storage
        .from('media')
        .remove(filesToDelete);

      if (error) throw error;

      toast({
        title: "Success",
        description: `${selectedFiles.length} files deleted successfully`
      });

      // Refresh the file list
      setSelectedFiles([]);
      fetchMediaFiles();
    } catch (error) {
      console.error('Error deleting files:', error);
      toast({
        title: "Error",
        description: "Failed to delete files",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredMedia = mediaFiles.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleUploadSuccess = (url: string) => {
    // Just refresh the file list after successful upload
    fetchMediaFiles();
    setShowUploader(false);
  };

  return (
    <DashboardLayout>
      <div className="py-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Media Library</h1>
          <div className="flex gap-2">
            {selectedFiles.length > 0 && (
              <Button 
                variant="destructive"
                onClick={handleDeleteSelected}
                disabled={loading}
              >
                <Trash2 className="mr-2 h-4 w-4" /> Delete Selected
              </Button>
            )}
            <Button 
              onClick={() => setShowUploader(!showUploader)}
              className="bg-sonicium-600 hover:bg-sonicium-700"
            >
              <Upload className="mr-2 h-4 w-4" /> Upload Media
            </Button>
          </div>
        </div>

        {showUploader && (
          <Card className="p-6">
            <MediaUploader onUploadSuccess={handleUploadSuccess} />
          </Card>
        )}

        <div className="flex items-center border rounded-md overflow-hidden">
          <Search className="mx-2 h-5 w-5 shrink-0 opacity-50" />
          <Input
            placeholder="Search media files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            <span>Loading media files...</span>
          </div>
        ) : filteredMedia.length === 0 ? (
          <div className="text-center py-10">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
              <Info className="h-6 w-6 text-gray-400" />
            </div>
            <h2 className="text-lg font-medium mb-1">No media files found</h2>
            <p className="text-muted-foreground mb-4">
              {searchQuery 
                ? "Try a different search term" 
                : "Upload your first media file to get started"}
            </p>
            {!searchQuery && (
              <Button 
                onClick={() => setShowUploader(true)}
                className="bg-sonicium-600 hover:bg-sonicium-700"
              >
                <Upload className="mr-2 h-4 w-4" /> Upload Media
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredMedia.map((file) => (
              <div 
                key={file.id} 
                className={`group relative rounded-md overflow-hidden border ${
                  selectedFiles.includes(file.id) ? 'ring-2 ring-sonicium-500 border-sonicium-500' : ''
                }`}
              >
                <div 
                  className="aspect-square bg-gray-100 relative cursor-pointer"
                  onClick={() => handleFileSelect(file.id)}
                >
                  <img 
                    src={file.url} 
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                  {selectedFiles.includes(file.id) && (
                    <div className="absolute inset-0 bg-sonicium-500 bg-opacity-20 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-sonicium-500 flex items-center justify-center">
                        <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-2">
                  <p className="text-xs font-medium truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Media;
