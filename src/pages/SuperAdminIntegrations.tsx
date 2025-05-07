
import React, { useState } from 'react';
import SuperAdminLayout from '@/components/SuperAdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { PlusCircle, Edit, Trash2, Check, X, Eye, EyeOff } from 'lucide-react';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  description: string;
  connected: boolean;
}

interface ApiCategory {
  name: string;
  keys: ApiKey[];
}

const SuperAdminIntegrations: React.FC = () => {
  const [apiCategories, setApiCategories] = useState<ApiCategory[]>([
    {
      name: 'SEO',
      keys: [
        { id: '1', name: 'Google Search Console', key: '•••••••••••••••••••', description: 'Connect to track website search performance', connected: true },
        { id: '2', name: 'SEMrush', key: '', description: 'Track keyword rankings and competitor analysis', connected: false },
      ]
    },
    {
      name: 'Social Media',
      keys: [
        { id: '3', name: 'Facebook API', key: '•••••••••••••••••••', description: 'Connect for social media post scheduling', connected: true },
        { id: '4', name: 'Twitter API', key: '•••••••••••••••••••', description: 'Connect for tweet scheduling and analytics', connected: true },
      ]
    },
    {
      name: 'Ads',
      keys: [
        { id: '5', name: 'Google Ads', key: '', description: 'Connect to manage ad campaigns', connected: false },
        { id: '6', name: 'Facebook Ads', key: '•••••••••••••••••••', description: 'Connect to manage Facebook ad campaigns', connected: true },
      ]
    },
    {
      name: 'Email',
      keys: [
        { id: '7', name: 'Mailchimp', key: '•••••••••••••••••••', description: 'Connect for email campaign management', connected: true },
        { id: '8', name: 'SendGrid', key: '', description: 'Connect for transactional emails', connected: false },
      ]
    },
    {
      name: 'Analytics',
      keys: [
        { id: '9', name: 'Google Analytics', key: '•••••••••••••••••••', description: 'Connect for website analytics', connected: true },
        { id: '10', name: 'Hotjar', key: '', description: 'Connect for user behavior analytics', connected: false },
      ]
    }
  ]);

  const [showKey, setShowKey] = useState<Record<string, boolean>>({});

  const toggleKeyVisibility = (id: string) => {
    setShowKey(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleConnectionStatus = (categoryName: string, keyId: string) => {
    setApiCategories(categories => 
      categories.map(category => 
        category.name === categoryName
          ? {
              ...category,
              keys: category.keys.map(key =>
                key.id === keyId
                  ? { ...key, connected: !key.connected }
                  : key
              )
            }
          : category
      )
    );
  };

  return (
    <SuperAdminLayout currentPage="API Integrations">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold font-inter">API Integrations</h1>
            <p className="text-gray-500 mt-1">Connect your services to enable API functionality</p>
          </div>
          <Button className="rounded-xl bg-purple-600 hover:bg-purple-700">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New API
          </Button>
        </div>

        <Tabs defaultValue={apiCategories[0].name}>
          <TabsList className="mb-6">
            {apiCategories.map(category => (
              <TabsTrigger 
                key={category.name} 
                value={category.name}
                className="px-4 py-2"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {apiCategories.map(category => (
            <TabsContent key={category.name} value={category.name} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.keys.map(api => (
                  <Card key={api.id} className="rounded-2xl shadow-sm">
                    <CardHeader className="flex flex-row items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {api.name}
                          <Badge variant={api.connected ? "default" : "outline"} className={api.connected ? "bg-green-100 text-green-800 hover:bg-green-200" : ""}>
                            {api.connected ? 'Connected' : 'Not Connected'}
                          </Badge>
                        </CardTitle>
                        <CardDescription>{api.description}</CardDescription>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Switch 
                          checked={api.connected} 
                          onCheckedChange={() => toggleConnectionStatus(category.name, api.id)} 
                        />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor={`api-key-${api.id}`}>API Key</Label>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => toggleKeyVisibility(api.id)}
                              className="h-6 w-6"
                            >
                              {showKey[api.id] ? <EyeOff size={16} /> : <Eye size={16} />}
                            </Button>
                          </div>
                          <div className="flex gap-2">
                            <Input 
                              id={`api-key-${api.id}`} 
                              type={showKey[api.id] ? 'text' : 'password'} 
                              value={api.key || ''} 
                              placeholder="Enter your API key here" 
                              className="rounded-xl"
                            />
                            <Button className="rounded-xl bg-purple-600 hover:bg-purple-700">
                              Connect
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4 flex justify-end space-x-2">
                      <Button variant="outline" size="sm" className="rounded-xl">
                        <Edit className="h-4 w-4 mr-1" /> Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl">
                        <Trash2 className="h-4 w-4 mr-1" /> Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </SuperAdminLayout>
  );
};

export default SuperAdminIntegrations;
