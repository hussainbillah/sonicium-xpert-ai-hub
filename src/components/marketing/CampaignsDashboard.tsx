
import React, { useState } from 'react';
import { 
  BarChart, 
  Calendar, 
  Filter, 
  PlusCircle, 
  Target, 
  Users,
  Monitor,
  Smartphone,
  Tablet,
  Laptop
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

// Sample campaign data
const campaignData = [
  { 
    id: 1, 
    name: 'Summer Sale 2025',
    status: 'active',
    target: 'US, CA, UK',
    audience: '25-45, M/F',
    budget: '$5,000',
    spent: '$2,340',
    impressions: '125,430',
    clicks: '3,245',
    ctr: '2.58%',
    conversions: '156',
    cost_per_conversion: '$15.00',
    roi: '240%'
  },
  { 
    id: 2, 
    name: 'New Product Launch',
    status: 'scheduled',
    target: 'US, DE, FR',
    audience: '18-35, F',
    budget: '$7,500',
    spent: '$0',
    impressions: '0',
    clicks: '0',
    ctr: '0%',
    conversions: '0',
    cost_per_conversion: '$0',
    roi: '0%'
  },
  { 
    id: 3, 
    name: 'Holiday Special',
    status: 'ended',
    target: 'Global',
    audience: 'All Ages',
    budget: '$10,000',
    spent: '$9,876',
    impressions: '450,768',
    clicks: '12,564',
    ctr: '2.78%',
    conversions: '856',
    cost_per_conversion: '$11.54',
    roi: '320%'
  },
  { 
    id: 4, 
    name: 'Brand Awareness',
    status: 'active',
    target: 'US, CA',
    audience: '18-55, M/F',
    budget: '$3,500',
    spent: '$1,245',
    impressions: '78,965',
    clicks: '1,432',
    ctr: '1.81%',
    conversions: '89',
    cost_per_conversion: '$13.99',
    roi: '175%'
  },
  { 
    id: 5, 
    name: 'Email Campaign',
    status: 'paused',
    target: 'EU',
    audience: '25-45, M/F',
    budget: '$2,500',
    spent: '$1,100',
    impressions: '54,321',
    clicks: '2,110',
    ctr: '3.88%',
    conversions: '132',
    cost_per_conversion: '$8.33',
    roi: '265%'
  }
];

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'ended':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyles()}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

// Device selection component
const DeviceSelection = ({ selectedDevices, onChange }: { 
  selectedDevices: string[]; 
  onChange: (devices: string[]) => void;
}) => {
  const devices = [
    { id: 'desktop', label: 'Desktop', icon: Monitor },
    { id: 'mobile', label: 'Mobile', icon: Smartphone },
    { id: 'tablet', label: 'Tablet', icon: Tablet },
    { id: 'laptop', label: 'Laptop', icon: Laptop },
  ];

  const toggleDevice = (device: string) => {
    if (selectedDevices.includes(device)) {
      onChange(selectedDevices.filter(d => d !== device));
    } else {
      onChange([...selectedDevices, device]);
    }
  };

  return (
    <div className="flex gap-3 flex-wrap">
      {devices.map((device) => {
        const DeviceIcon = device.icon;
        const isSelected = selectedDevices.includes(device.id);
        return (
          <Button
            key={device.id}
            type="button"
            variant={isSelected ? "default" : "outline"}
            className={`flex flex-col gap-2 h-auto py-2 px-4 ${isSelected ? 'bg-primary text-primary-foreground' : ''}`}
            onClick={() => toggleDevice(device.id)}
          >
            <DeviceIcon className="h-5 w-5" />
            <span className="text-xs">{device.label}</span>
          </Button>
        );
      })}
    </div>
  );
};

const CampaignsDashboard: React.FC = () => {
  const [isNewCampaignOpen, setIsNewCampaignOpen] = useState(false);
  const [campaignName, setCampaignName] = useState('');
  const [targetCountry, setTargetCountry] = useState('');
  const [ageRange, setAgeRange] = useState([18, 65]);
  const [gender, setGender] = useState('all');
  const [interests, setInterests] = useState<string[]>([]);
  const [devices, setDevices] = useState<string[]>(['desktop', 'mobile']);
  const [budget, setBudget] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would handle the submission to create a new campaign
    // For now we'll just close the dialog
    setIsNewCampaignOpen(false);
    
    // Reset form
    setCampaignName('');
    setTargetCountry('');
    setAgeRange([18, 65]);
    setGender('all');
    setInterests([]);
    setDevices(['desktop', 'mobile']);
    setBudget('');
    setStartDate(undefined);
    setEndDate(undefined);
  };
  
  const interestOptions = [
    { id: 'tech', label: 'Technology' },
    { id: 'fashion', label: 'Fashion' },
    { id: 'sports', label: 'Sports' },
    { id: 'travel', label: 'Travel' },
    { id: 'food', label: 'Food & Dining' },
    { id: 'health', label: 'Health & Fitness' },
    { id: 'entertainment', label: 'Entertainment' },
    { id: 'education', label: 'Education' }
  ];
  
  const handleInterestChange = (interest: string) => {
    setInterests(prev => {
      if (prev.includes(interest)) {
        return prev.filter(item => item !== interest);
      } else {
        return [...prev, interest];
      }
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
            
            <form onSubmit={handleSubmit} className="space-y-6 py-4">
              <Tabs defaultValue="basic">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="targeting">Audience Targeting</TabsTrigger>
                  <TabsTrigger value="budget">Budget & Schedule</TabsTrigger>
                </TabsList>
                
                <TabsContent value="basic" className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="name">Campaign Name</Label>
                    <Input
                      id="name"
                      value={campaignName}
                      onChange={(e) => setCampaignName(e.target.value)}
                      placeholder="Enter campaign name"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="country">Target Country</Label>
                    <Select value={targetCountry} onValueChange={setTargetCountry}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                        <SelectItem value="de">Germany</SelectItem>
                        <SelectItem value="fr">France</SelectItem>
                        <SelectItem value="global">Global (All Countries)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Device Targeting</Label>
                    <div className="mt-2">
                      <DeviceSelection
                        selectedDevices={devices}
                        onChange={setDevices}
                      />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="targeting" className="space-y-4 mt-4">
                  <div>
                    <Label>Age Range ({ageRange[0]} - {ageRange[1]} years)</Label>
                    <div className="pt-6 px-2">
                      <Slider
                        min={13}
                        max={90}
                        step={1}
                        value={ageRange}
                        onValueChange={setAgeRange}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label>Gender</Label>
                    <RadioGroup value={gender} onValueChange={setGender} className="flex space-x-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female">Female</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="all" id="all-genders" />
                        <Label htmlFor="all-genders">All</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div>
                    <Label>Interests & Behaviors</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {interestOptions.map((interest) => (
                        <div key={interest.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`interest-${interest.id}`}
                            checked={interests.includes(interest.id)}
                            onCheckedChange={() => handleInterestChange(interest.id)}
                          />
                          <Label htmlFor={`interest-${interest.id}`}>{interest.label}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="budget" className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="budget">Campaign Budget ($)</Label>
                    <Input
                      id="budget"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      type="number"
                      min="1"
                      step="0.01"
                      placeholder="Enter budget amount"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Start Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal mt-2"
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            {startDate ? format(startDate, 'PPP') : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <CalendarComponent
                            mode="single"
                            selected={startDate}
                            onSelect={setStartDate}
                            initialFocus
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
                            className="w-full justify-start text-left font-normal mt-2"
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            {endDate ? format(endDate, 'PPP') : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <CalendarComponent
                            mode="single"
                            selected={endDate}
                            onSelect={setEndDate}
                            disabled={(date) => {
                              return startDate ? date < startDate : false;
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <DialogFooter>
                <Button 
                  variant="outline" 
                  type="button"
                  onClick={() => setIsNewCampaignOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-sonicium-600 hover:bg-sonicium-700">
                  Create Campaign
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" /> Filter
          </Button>
          <Select defaultValue="all">
            <SelectTrigger className="w-[140px] h-9">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
              <SelectItem value="ended">Ended</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="performance">
            <SelectTrigger className="w-[160px] h-9">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="performance">Performance</SelectItem>
              <SelectItem value="budget">Budget</SelectItem>
              <SelectItem value="date">Date Created</SelectItem>
              <SelectItem value="name">Campaign Name</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">5 campaigns</span>
          <Button variant="outline" size="sm">
            Export
          </Button>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Spent</TableHead>
                <TableHead>Impressions</TableHead>
                <TableHead>Clicks</TableHead>
                <TableHead>CTR</TableHead>
                <TableHead>Conversions</TableHead>
                <TableHead>ROI</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaignData.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell><StatusBadge status={campaign.status} /></TableCell>
                  <TableCell>{campaign.target}</TableCell>
                  <TableCell>{campaign.budget}</TableCell>
                  <TableCell>{campaign.spent}</TableCell>
                  <TableCell>{campaign.impressions}</TableCell>
                  <TableCell>{campaign.clicks}</TableCell>
                  <TableCell>{campaign.ctr}</TableCell>
                  <TableCell>{campaign.conversions}</TableCell>
                  <TableCell className="text-green-600 font-medium">{campaign.roi}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
            <CardDescription>Overview of key performance metrics</CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              Interactive performance chart will be displayed here
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>Current period vs. previous</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Total Clicks</span>
                  <span className="text-green-600">+12.5%</span>
                </div>
                <div className="text-2xl font-bold">19,351</div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Average CTR</span>
                  <span className="text-green-600">+1.8%</span>
                </div>
                <div className="text-2xl font-bold">2.73%</div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Conversions</span>
                  <span className="text-green-600">+23.4%</span>
                </div>
                <div className="text-2xl font-bold">1,233</div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Total ROI</span>
                  <span className="text-green-600">+15.2%</span>
                </div>
                <div className="text-2xl font-bold">205%</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CampaignsDashboard;
