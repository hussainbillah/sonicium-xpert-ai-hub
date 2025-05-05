
import React, { useState } from 'react';
import { 
  BarChart as BarChartIcon,
  BarChart2,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  Calendar,
  Download,
  Plus,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Target
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BarChart, LineChart, PieChart } from "@/components/ui/custom-chart";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format, subDays } from 'date-fns';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

// Sample campaigns for the sidebar
const campaigns = [
  { 
    id: 1, 
    name: 'Summer Sale 2025', 
    status: 'active', 
    period: 'Jun 1 - Aug 31, 2025',
    performance: 'high'
  },
  { 
    id: 2, 
    name: 'New Product Launch', 
    status: 'scheduled', 
    period: 'Sep 15 - Oct 15, 2025',
    performance: 'n/a'
  },
  { 
    id: 3, 
    name: 'Holiday Special', 
    status: 'ended', 
    period: 'Nov 15 - Dec 25, 2024',
    performance: 'high'
  },
  { 
    id: 4, 
    name: 'Brand Awareness', 
    status: 'active', 
    period: 'May 1 - Dec 31, 2025',
    performance: 'medium'
  },
  { 
    id: 5, 
    name: 'Email Campaign', 
    status: 'paused', 
    period: 'Apr 15 - May 15, 2025',
    performance: 'low'
  }
];

// Sample performance data
const performanceData = [
  { date: '2025-05-01', reach: 12500, clicks: 340, conversions: 28, ctr: 2.72, roas: 3.6 },
  { date: '2025-05-02', reach: 13200, clicks: 356, conversions: 32, ctr: 2.69, roas: 3.8 },
  { date: '2025-05-03', reach: 12800, clicks: 378, conversions: 35, ctr: 2.95, roas: 4.1 },
  { date: '2025-05-04', reach: 14100, clicks: 412, conversions: 38, ctr: 2.92, roas: 3.9 },
  { date: '2025-05-05', reach: 15300, clicks: 465, conversions: 43, ctr: 3.04, roas: 4.2 },
  { date: '2025-05-06', reach: 16500, clicks: 492, conversions: 45, ctr: 2.98, roas: 4.0 },
  { date: '2025-05-07', reach: 17200, clicks: 528, conversions: 50, ctr: 3.07, roas: 4.3 }
];

// Campaign performance badge
const PerformanceBadge = ({ performance }: { performance: string }) => {
  if (performance === 'n/a') {
    return <Badge variant="outline">Not Started</Badge>;
  }

  const styles = {
    high: 'bg-green-100 text-green-800 hover:bg-green-100',
    medium: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
    low: 'bg-red-100 text-red-800 hover:bg-red-100'
  };

  const labels = {
    high: 'High Performance',
    medium: 'Medium Performance',
    low: 'Low Performance'
  };

  return (
    <Badge className={styles[performance as keyof typeof styles]}>
      {labels[performance as keyof typeof labels]}
    </Badge>
  );
};

// KPI Card component
const KpiCard = ({ title, value, change, icon: Icon, positive = true }: {
  title: string;
  value: string | number;
  change: string;
  icon: React.ElementType;
  positive?: boolean;
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="text-muted-foreground">{title}</div>
          <div className={`p-2 rounded-full ${positive ? 'bg-green-100' : 'bg-red-100'}`}>
            <Icon className={`h-5 w-5 ${positive ? 'text-green-600' : 'text-red-600'}`} />
          </div>
        </div>
        <div className="text-3xl font-bold mb-2">{value}</div>
        <div className="flex items-center">
          {positive ? (
            <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
          )}
          <span className={positive ? 'text-green-600' : 'text-red-600'}>
            {change}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

const AnalysisDashboard: React.FC = () => {
  const [selectedCampaign, setSelectedCampaign] = useState<number | null>(1);
  const [isNewAnalysisOpen, setIsNewAnalysisOpen] = useState(false);
  const [dateRange, setDateRange] = useState<{
    from: Date;
    to: Date | undefined;
  }>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  const [selectedKpi, setSelectedKpi] = useState('ctr');
  const [selectedCampaignForAnalysis, setSelectedCampaignForAnalysis] = useState('');

  const handleNewAnalysis = () => {
    // Handle creating a new analysis
    setIsNewAnalysisOpen(false);
  };

  // Prepare chart data
  const chartData = performanceData.map(day => ({
    name: format(new Date(day.date), 'MMM d'),
    reach: day.reach,
    clicks: day.clicks,
    conversions: day.conversions,
    ctr: day.ctr,
    roas: day.roas
  }));

  return (
    <div className="flex h-full">
      <div className="w-72 border-r pr-4 mr-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Campaigns</h3>
          <Dialog open={isNewAnalysisOpen} onOpenChange={setIsNewAnalysisOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-1" /> New Analysis
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Analysis</DialogTitle>
                <DialogDescription>
                  Select a campaign and metrics to analyze performance.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Select Campaign</Label>
                  <Select
                    value={selectedCampaignForAnalysis}
                    onValueChange={setSelectedCampaignForAnalysis}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select campaign" />
                    </SelectTrigger>
                    <SelectContent>
                      {campaigns.map((campaign) => (
                        <SelectItem key={campaign.id} value={campaign.id.toString()}>
                          {campaign.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Date Range</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {dateRange.from ? (
                          dateRange.to ? (
                            <>
                              {format(dateRange.from, "LLL dd, y")} -{" "}
                              {format(dateRange.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(dateRange.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date range</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="range"
                        selected={{ 
                          from: dateRange.from,
                          to: dateRange.to
                        }}
                        onSelect={(range) => {
                          if (range) {
                            setDateRange({
                              from: range.from || new Date(),
                              to: range.to
                            });
                          }
                        }}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label>Primary KPI Focus</Label>
                  <RadioGroup value={selectedKpi} onValueChange={setSelectedKpi}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ctr" id="ctr" />
                      <Label htmlFor="ctr">Click-Through Rate (CTR)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="roas" id="roas" />
                      <Label htmlFor="roas">Return On Ad Spend (ROAS)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="conversions" id="conversions" />
                      <Label htmlFor="conversions">Conversions</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="engagement" id="engagement" />
                      <Label htmlFor="engagement">Engagement</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsNewAnalysisOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleNewAnalysis}>Generate Analysis</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <ScrollArea className="h-[calc(100vh-13rem)]">
          <div className="space-y-2 pr-3">
            {campaigns.map((campaign) => (
              <Card 
                key={campaign.id}
                className={`cursor-pointer transition-all hover:border-primary ${selectedCampaign === campaign.id ? 'border-primary shadow-md' : ''}`}
                onClick={() => setSelectedCampaign(campaign.id)}
              >
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div className="font-medium">{campaign.name}</div>
                      <Badge 
                        variant="outline"
                        className={
                          campaign.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' :
                          campaign.status === 'paused' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                          campaign.status === 'scheduled' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                          'bg-gray-50 text-gray-700 border-gray-200'
                        }
                      >
                        {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">{campaign.period}</div>
                    <div className="pt-1">
                      <PerformanceBadge performance={campaign.performance} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Performance Analytics</h2>
            <p className="text-muted-foreground">Detailed insights and campaign performance metrics</p>
          </div>
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Last 7 days
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarComponent
                  mode="range"
                  selected={{
                    from: dateRange.from,
                    to: dateRange.to
                  }}
                  onSelect={(range) => {
                    if (range) {
                      setDateRange({
                        from: range.from || new Date(),
                        to: range.to
                      });
                    }
                  }}
                />
              </PopoverContent>
            </Popover>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <KpiCard 
            title="Total Reach" 
            value="101,600"
            change="+15.2% from last period"
            icon={Target}
            positive={true}
          />
          <KpiCard 
            title="Clicks" 
            value="2,971"
            change="+8.7% from last period"
            icon={BarChartIcon}
            positive={true}
          />
          <KpiCard 
            title="Conversions" 
            value="271"
            change="+12.3% from last period"
            icon={BarChart2}
            positive={true}
          />
          <KpiCard 
            title="ROAS" 
            value="4.0x"
            change="+0.8x from last period"
            icon={TrendingUp}
            positive={true}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between items-center">
                <div>Click Performance</div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <LineChartIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <BarChartIcon className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
              <CardDescription>Daily clicks and CTR</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <LineChart
                data={chartData}
                lines={[
                  { dataKey: "clicks", stroke: "#3b82f6", strokeWidth: 2, name: "Clicks" },
                  { dataKey: "ctr", stroke: "#8b5cf6", strokeWidth: 2, name: "CTR (%)" }
                ]}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between items-center">
                <div>Conversion Metrics</div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <LineChartIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <BarChartIcon className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
              <CardDescription>Conversions and ROAS</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <BarChart
                data={chartData}
                bars={[
                  { dataKey: "conversions", fill: "#22c55e", name: "Conversions" },
                  { dataKey: "roas", fill: "#f59e0b", name: "ROAS" }
                ]}
              />
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Campaign Reach</CardTitle>
              <CardDescription>Total audience reach per day</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <BarChart
                data={chartData}
                bars={[{ dataKey: "reach", fill: "#3b82f6", name: "Daily Reach" }]}
              />
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">
              Showing data for May 1-7, 2025
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Audience Breakdown</CardTitle>
              <CardDescription>Demographics and devices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium mb-3">Age Distribution</h4>
                  <PieChart
                    data={[
                      { name: '18-24', value: 20, color: "#3b82f6" },
                      { name: '25-34', value: 35, color: "#22c55e" },
                      { name: '35-44', value: 25, color: "#f59e0b" },
                      { name: '45-54', value: 15, color: "#8b5cf6" },
                      { name: '55+', value: 5, color: "#6b7280" }
                    ]}
                    dataKey="value"
                    height={150}
                  />
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-3">Device Usage</h4>
                  <PieChart
                    data={[
                      { name: 'Desktop', value: 32, color: "#3b82f6" },
                      { name: 'Mobile', value: 56, color: "#22c55e" },
                      { name: 'Tablet', value: 12, color: "#f59e0b" }
                    ]}
                    dataKey="value"
                    height={150}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AnalysisDashboard;
