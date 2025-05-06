
import React, { useState } from 'react';
import SuperAdminLayout from '@/components/SuperAdminLayout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Pencil, Plus, Search, Trash2 } from "lucide-react";

interface Page {
  id: string;
  title: string;
  slug: string;
  status: 'published' | 'draft';
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  content: string;
  lastUpdated: string;
}

const SuperAdminPages: React.FC = () => {
  // Sample data for pages
  const [pages, setPages] = useState<Page[]>([
    {
      id: '1',
      title: 'Homepage',
      slug: 'home',
      status: 'published',
      metaTitle: 'Welcome to our SaaS Platform',
      metaDescription: 'Our SaaS platform helps businesses grow and succeed.',
      keywords: 'saas, platform, business',
      content: '<h1>Welcome to our platform</h1><p>This is the homepage content.</p>',
      lastUpdated: '2025-05-01',
    },
    {
      id: '2',
      title: 'About Us',
      slug: 'about',
      status: 'published',
      metaTitle: 'About Our Company',
      metaDescription: 'Learn about our company history and values.',
      keywords: 'about, company, values',
      content: '<h1>About Our Company</h1><p>We are a dedicated team...</p>',
      lastUpdated: '2025-04-28',
    },
    {
      id: '3',
      title: 'Contact Us',
      slug: 'contact',
      status: 'draft',
      metaTitle: 'Contact Our Support Team',
      metaDescription: 'Get in touch with our support team for assistance.',
      keywords: 'contact, support, help',
      content: '<h1>Contact Us</h1><p>Reach out to our support team...</p>',
      lastUpdated: '2025-05-05',
    },
  ]);

  const [currentPage, setCurrentPage] = useState<Page | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // New page template
  const emptyPage: Page = {
    id: '',
    title: '',
    slug: '',
    status: 'draft',
    metaTitle: '',
    metaDescription: '',
    keywords: '',
    content: '',
    lastUpdated: new Date().toISOString().split('T')[0],
  };

  // Form state
  const [formData, setFormData] = useState<Page>(emptyPage);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStatusChange = (checked: boolean) => {
    setFormData({ ...formData, status: checked ? 'published' : 'draft' });
  };

  const handleCreatePage = () => {
    const newPage = {
      ...formData,
      id: Date.now().toString(),
      lastUpdated: new Date().toISOString().split('T')[0],
    };
    setPages([...pages, newPage]);
    setFormData(emptyPage);
    setIsCreateDialogOpen(false);
  };

  const handleUpdatePage = () => {
    const updatedPages = pages.map(page => 
      page.id === formData.id ? { ...formData, lastUpdated: new Date().toISOString().split('T')[0] } : page
    );
    setPages(updatedPages);
    setFormData(emptyPage);
    setIsEditDialogOpen(false);
  };

  const handleDeletePage = () => {
    if (currentPage) {
      const filteredPages = pages.filter(page => page.id !== currentPage.id);
      setPages(filteredPages);
      setCurrentPage(null);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleEditClick = (page: Page) => {
    setFormData(page);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (page: Page) => {
    setCurrentPage(page);
    setIsDeleteDialogOpen(true);
  };

  const filteredPages = pages.filter(page => 
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const togglePageStatus = (id: string) => {
    const updatedPages = pages.map(page => {
      if (page.id === id) {
        const newStatus = page.status === 'published' ? 'draft' : 'published';
        return { ...page, status: newStatus, lastUpdated: new Date().toISOString().split('T')[0] };
      }
      return page;
    });
    setPages(updatedPages);
  };

  return (
    <SuperAdminLayout currentPage="Pages">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search pages..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus size={18} className="mr-2" />
                Create Page
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Page</DialogTitle>
                <DialogDescription>
                  Fill in the details to create a new page.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Tabs defaultValue="content" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="seo">SEO Settings</TabsTrigger>
                  </TabsList>
                  <TabsContent value="content" className="space-y-4 pt-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Page Title</Label>
                        <Input 
                          id="title"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          placeholder="Enter page title"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="slug">URL Slug</Label>
                        <Input 
                          id="slug"
                          name="slug"
                          value={formData.slug}
                          onChange={handleInputChange}
                          placeholder="enter-url-slug"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="content">Page Content</Label>
                        <Textarea 
                          id="content"
                          name="content"
                          value={formData.content}
                          onChange={handleInputChange}
                          placeholder="Enter page content"
                          className="min-h-[200px]"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="status">Published</Label>
                        <Switch 
                          id="status"
                          checked={formData.status === 'published'}
                          onCheckedChange={handleStatusChange}
                        />
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="seo" className="space-y-4 pt-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="metaTitle">Meta Title</Label>
                        <Input 
                          id="metaTitle"
                          name="metaTitle"
                          value={formData.metaTitle}
                          onChange={handleInputChange}
                          placeholder="Enter meta title"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="metaDescription">Meta Description</Label>
                        <Textarea 
                          id="metaDescription"
                          name="metaDescription"
                          value={formData.metaDescription}
                          onChange={handleInputChange}
                          placeholder="Enter meta description"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="keywords">SEO Keywords</Label>
                        <Input 
                          id="keywords"
                          name="keywords"
                          value={formData.keywords}
                          onChange={handleInputChange}
                          placeholder="keyword1, keyword2, keyword3"
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleCreatePage}>Create Page</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Pages</CardTitle>
            <CardDescription>
              Manage your website pages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">Title</th>
                    <th className="px-6 py-3">URL</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Last Updated</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPages.map((page) => (
                    <tr key={page.id} className="bg-white border-b hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">{page.title}</td>
                      <td className="px-6 py-4 text-gray-500">/{page.slug}</td>
                      <td className="px-6 py-4">
                        <Switch 
                          checked={page.status === 'published'}
                          onCheckedChange={() => togglePageStatus(page.id)}
                        />
                      </td>
                      <td className="px-6 py-4">{page.lastUpdated}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditClick(page)}>
                            <Pencil size={16} />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye size={16} />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-500"
                            onClick={() => handleDeleteClick(page)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredPages.length === 0 && (
                    <tr className="bg-white border-b">
                      <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                        No pages found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Page</DialogTitle>
            <DialogDescription>
              Update your page information.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="seo">SEO Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="content" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-title">Page Title</Label>
                    <Input 
                      id="edit-title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-slug">URL Slug</Label>
                    <Input 
                      id="edit-slug"
                      name="slug"
                      value={formData.slug}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-content">Page Content</Label>
                    <Textarea 
                      id="edit-content"
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      className="min-h-[200px]"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="edit-status">Published</Label>
                    <Switch 
                      id="edit-status"
                      checked={formData.status === 'published'}
                      onCheckedChange={handleStatusChange}
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="seo" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-metaTitle">Meta Title</Label>
                    <Input 
                      id="edit-metaTitle"
                      name="metaTitle"
                      value={formData.metaTitle}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-metaDescription">Meta Description</Label>
                    <Textarea 
                      id="edit-metaDescription"
                      name="metaDescription"
                      value={formData.metaDescription}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-keywords">SEO Keywords</Label>
                    <Input 
                      id="edit-keywords"
                      name="keywords"
                      value={formData.keywords}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdatePage}>Update Page</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Page</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{currentPage?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeletePage}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SuperAdminLayout>
  );
};

export default SuperAdminPages;
