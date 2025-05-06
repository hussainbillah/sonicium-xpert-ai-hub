
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Edit, Trash2, Search, Plus, FileText } from "lucide-react";
import SuperAdminLayout from '@/components/SuperAdminLayout';
import { useToast } from '@/components/ui/use-toast';

type PageStatus = "draft" | "published";

interface Page {
  id: string;
  title: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  content: string;
  status: PageStatus;
  lastUpdated: string;
}

const SuperAdminPages = () => {
  const { toast } = useToast();
  const [pages, setPages] = useState<Page[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [isNewPage, setIsNewPage] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [pageToDelete, setPageToDelete] = useState<string | null>(null);

  // New form state
  const [formData, setFormData] = useState<Omit<Page, 'id' | 'lastUpdated'> & { id?: string }>({
    title: '',
    slug: '',
    metaTitle: '',
    metaDescription: '',
    keywords: '',
    content: '',
    status: 'draft'
  });

  useEffect(() => {
    // Load sample data for pages
    const samplePages: Page[] = [
      {
        id: '1',
        title: 'Homepage',
        slug: 'home',
        metaTitle: 'Welcome to Our Platform',
        metaDescription: 'The best marketing platform for small businesses.',
        keywords: 'marketing, platform, business',
        content: '<p>Welcome to our marketing platform. This is the homepage content.</p>',
        status: 'published',
        lastUpdated: '2025-05-01T10:30:00Z'
      },
      {
        id: '2',
        title: 'About Us',
        slug: 'about',
        metaTitle: 'About Our Company',
        metaDescription: 'Learn about our company history and mission.',
        keywords: 'about, company, mission',
        content: '<p>We are a team of dedicated marketers helping small businesses grow.</p>',
        status: 'published',
        lastUpdated: '2025-05-02T14:15:00Z'
      },
      {
        id: '3',
        title: 'New Features (Draft)',
        slug: 'new-features',
        metaTitle: 'New Features Coming Soon',
        metaDescription: 'Explore our upcoming features.',
        keywords: 'features, upcoming, new',
        content: '<p>Here are some exciting new features we are working on...</p>',
        status: 'draft',
        lastUpdated: '2025-05-03T09:45:00Z'
      }
    ];
    
    setPages(samplePages);
  }, []);

  const filteredPages = pages.filter(page => 
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleStatusChange = (status: PageStatus) => {
    setFormData({
      ...formData,
      status
    });
  };

  const handleEditPage = (page: Page) => {
    setFormData({
      id: page.id,
      title: page.title,
      slug: page.slug,
      metaTitle: page.metaTitle,
      metaDescription: page.metaDescription,
      keywords: page.keywords,
      content: page.content,
      status: page.status
    });
    setEditingPage(page);
    setIsNewPage(false);
  };

  const handleNewPage = () => {
    setFormData({
      title: '',
      slug: '',
      metaTitle: '',
      metaDescription: '',
      keywords: '',
      content: '',
      status: 'draft'
    });
    setEditingPage(null);
    setIsNewPage(true);
  };

  const handleSavePage = () => {
    if (!formData.title || !formData.slug) {
      toast({
        title: "Error",
        description: "Title and slug are required fields.",
        variant: "destructive"
      });
      return;
    }

    if (isNewPage) {
      // Add new page
      const newPage: Page = {
        ...formData,
        id: `page-${Date.now()}`,
        lastUpdated: new Date().toISOString(),
        status: formData.status as PageStatus
      };
      
      setPages([...pages, newPage]);
      toast({
        title: "Success",
        description: "Page created successfully."
      });
    } else if (editingPage) {
      // Update existing page
      const updatedPages = pages.map(page => 
        page.id === formData.id 
          ? { 
              ...page, 
              ...formData,
              lastUpdated: new Date().toISOString(),
              status: formData.status as PageStatus
            } 
          : page
      );
      
      setPages(updatedPages);
      toast({
        title: "Success",
        description: "Page updated successfully."
      });
    }

    setEditingPage(null);
    setIsNewPage(false);
  };

  const handleDeletePage = (id: string) => {
    setPageToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeletePage = () => {
    if (pageToDelete) {
      const updatedPages = pages.filter(page => page.id !== pageToDelete);
      setPages(updatedPages);
      toast({
        title: "Success",
        description: "Page deleted successfully."
      });
      setIsDeleteDialogOpen(false);
      setPageToDelete(null);
    }
  };

  const handleToggleStatus = (id: string, currentStatus: PageStatus) => {
    const newStatus: PageStatus = currentStatus === 'published' ? 'draft' : 'published';
    const updatedPages = pages.map(page => 
      page.id === id ? { ...page, status: newStatus, lastUpdated: new Date().toISOString() } : page
    );
    
    setPages(updatedPages);
    toast({
      title: "Status Changed",
      description: `Page is now ${newStatus}.`
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <SuperAdminLayout currentPage="Pages">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Pages Management</h1>
            <p className="text-muted-foreground">Create and manage website pages</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search pages..."
                className="pl-8 w-full sm:w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={handleNewPage}>
              <Plus className="mr-2 h-4 w-4" /> Add Page
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Pages</CardTitle>
            <CardDescription>Manage your website pages and their SEO settings</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>URL Slug</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPages.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <FileText className="h-8 w-8 text-muted-foreground" />
                        <p className="text-muted-foreground">No pages found</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPages.map((page) => (
                    <TableRow key={page.id}>
                      <TableCell>{page.title}</TableCell>
                      <TableCell>{page.slug}</TableCell>
                      <TableCell>
                        <Button 
                          variant={page.status === 'published' ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleToggleStatus(page.id, page.status)}
                        >
                          {page.status === 'published' ? 'Published' : 'Draft'}
                        </Button>
                      </TableCell>
                      <TableCell>{formatDate(page.lastUpdated)}</TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button variant="ghost" size="icon" title="View Page">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleEditPage(page)}
                          title="Edit Page"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDeletePage(page.id)}
                          title="Delete Page"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Page Editor Dialog */}
        <Dialog open={isNewPage || editingPage !== null} onOpenChange={(open) => {
          if (!open) {
            setIsNewPage(false);
            setEditingPage(null);
          }
        }}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{isNewPage ? 'Create New Page' : 'Edit Page'}</DialogTitle>
              <DialogDescription>
                {isNewPage 
                  ? 'Add a new page to your website' 
                  : 'Make changes to the selected page'}
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="general">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium mb-1">Page Title</label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter page title"
                    />
                  </div>

                  <div>
                    <label htmlFor="slug" className="block text-sm font-medium mb-1">URL Slug</label>
                    <Input
                      id="slug"
                      name="slug"
                      value={formData.slug}
                      onChange={handleInputChange}
                      placeholder="enter-page-slug"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      The URL will be: example.com/{formData.slug || 'page-slug'}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Status</label>
                    <div className="flex space-x-2">
                      <Button
                        type="button"
                        variant={formData.status === 'draft' ? 'default' : 'outline'}
                        onClick={() => handleStatusChange('draft')}
                      >
                        Draft
                      </Button>
                      <Button
                        type="button"
                        variant={formData.status === 'published' ? 'default' : 'outline'}
                        onClick={() => handleStatusChange('published')}
                      >
                        Published
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="seo" className="space-y-4">
                <div>
                  <label htmlFor="metaTitle" className="block text-sm font-medium mb-1">Meta Title</label>
                  <Input
                    id="metaTitle"
                    name="metaTitle"
                    value={formData.metaTitle}
                    onChange={handleInputChange}
                    placeholder="SEO title for search engines"
                  />
                </div>

                <div>
                  <label htmlFor="metaDescription" className="block text-sm font-medium mb-1">Meta Description</label>
                  <textarea
                    id="metaDescription"
                    name="metaDescription"
                    value={formData.metaDescription}
                    onChange={handleInputChange}
                    placeholder="Brief description for search engines"
                    className="w-full min-h-[100px] p-2 border rounded-md"
                  />
                </div>

                <div>
                  <label htmlFor="keywords" className="block text-sm font-medium mb-1">SEO Keywords</label>
                  <Input
                    id="keywords"
                    name="keywords"
                    value={formData.keywords}
                    onChange={handleInputChange}
                    placeholder="Comma-separated keywords"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Separate keywords with commas (e.g., marketing, business, tools)
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="content" className="space-y-4">
                <div>
                  <label htmlFor="content" className="block text-sm font-medium mb-1">Page Content</label>
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder="Enter page content here..."
                    className="w-full min-h-[300px] p-2 border rounded-md"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    You can use HTML tags for formatting.
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter className="flex justify-between">
              <Button variant="outline" onClick={() => {
                setIsNewPage(false);
                setEditingPage(null);
              }}>
                Cancel
              </Button>
              <Button onClick={handleSavePage}>
                {isNewPage ? 'Create Page' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete the page.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDeletePage}>
                Delete Page
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </SuperAdminLayout>
  );
};

export default SuperAdminPages;
