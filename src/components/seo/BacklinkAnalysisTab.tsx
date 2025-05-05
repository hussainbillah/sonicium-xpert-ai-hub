import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, BarChart, PieChart } from "@/components/ui/custom-chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link, Search } from "lucide-react";

// Sample data
const backlinkTypeData = [
  { name: 'Dofollow', value: 1850, color: '#22c55e' },
  { name: 'Nofollow', value: 980, color: '#f59e0b' },
  { name: 'Toxic', value: 120, color: '#ef4444' },
];

const domainIndustryData = [
  { name: 'Technology', count: 215 },
  { name: 'Marketing', count: 189 },
  { name: 'E-commerce', count: 157 },
  { name: 'News/Media', count: 134 },
  { name: 'Education', count: 98 },
  { name: 'Finance', count: 67 },
  { name: 'Healthcare', count: 45 },
  { name: 'Other', count: 95 },
];

const backlinkGrowthData = Array.from({ length: 12 }, (_, i) => ({
  name: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
  count: 1500 + Math.floor(Math.random() * 20 - 5) * 30 + i * 120,
}));

const topBacklinks = [
  { 
    domain: 'techcrunch.com', 
    url: 'https://techcrunch.com/2023/05/15/top-seo-tools/', 
    anchorText: 'top SEO analytics platform', 
    da: 94, 
    type: 'dofollow', 
    firstSeen: '2023-05-15', 
    traffic: 'High'
  },
  { 
    domain: 'searchenginejournal.com', 
    url: 'https://www.searchenginejournal.com/best-seo-tools/', 
    anchorText: 'comprehensive SEO suite', 
    da: 91, 
    type: 'dofollow', 
    firstSeen: '2023-04-22', 
    traffic: 'High'
  },
  { 
    domain: 'ahrefs.com', 
    url: 'https://ahrefs.com/blog/seo-tools-comparison/', 
    anchorText: 'competitor analysis tool', 
    da: 89, 
    type: 'dofollow', 
    firstSeen: '2023-06-08', 
    traffic: 'High'
  },
  { 
    domain: 'moz.com', 
    url: 'https://moz.com/blog/best-seo-tools-2023', 
    anchorText: 'innovative SEO dashboard', 
    da: 90, 
    type: 'nofollow', 
    firstSeen: '2023-03-14', 
    traffic: 'High'
  },
  { 
    domain: 'semrush.com', 
    url: 'https://www.semrush.com/blog/seo-tools-review/', 
    anchorText: 'SEO analytics solution', 
    da: 88, 
    type: 'dofollow', 
    firstSeen: '2023-07-19', 
    traffic: 'High'
  },
  { 
    domain: 'seoroundtable.com', 
    url: 'https://www.seoroundtable.com/tools/', 
    anchorText: 'recommended SEO tool', 
    da: 83, 
    type: 'dofollow', 
    firstSeen: '2023-08-02', 
    traffic: 'Medium'
  },
  { 
    domain: 'searchengineland.com', 
    url: 'https://searchengineland.com/best-seo-tools/', 
    anchorText: 'advanced SEO analytics', 
    da: 87, 
    type: 'dofollow', 
    firstSeen: '2023-02-28', 
    traffic: 'High'
  },
  { 
    domain: 'neilpatel.com', 
    url: 'https://neilpatel.com/blog/seo-tools-comparison/', 
    anchorText: 'powerful SEO platform', 
    da: 84, 
    type: 'dofollow', 
    firstSeen: '2023-05-30', 
    traffic: 'Medium'
  },
  { 
    domain: 'bloggerjet.com', 
    url: 'https://bloggerjet.com/tools/', 
    anchorText: 'SEO tool', 
    da: 68, 
    type: 'nofollow', 
    firstSeen: '2023-07-12', 
    traffic: 'Low'
  },
  { 
    domain: 'backlinko.com', 
    url: 'https://backlinko.com/seo-tools', 
    anchorText: 'SEO analytics', 
    da: 82, 
    type: 'dofollow', 
    firstSeen: '2023-04-05', 
    traffic: 'Medium'
  },
];

const BacklinkAnalysisTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [trafficFilter, setTrafficFilter] = useState<string>('all');
  
  const filteredBacklinks = topBacklinks.filter(backlink => {
    const matchesSearch = searchTerm === '' || 
      backlink.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
      backlink.anchorText.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || backlink.type === typeFilter;
    const matchesTraffic = trafficFilter === 'all' || backlink.traffic === trafficFilter;
    
    return matchesSearch && matchesType && matchesTraffic;
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Backlink Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Total Backlinks</div>
                <div className="text-3xl font-bold">2,950</div>
              </div>
              
              <div>
                <div className="text-sm text-muted-foreground mb-1">Referring Domains</div>
                <div className="text-3xl font-bold">712</div>
              </div>
              
              <div>
                <div className="text-sm text-muted-foreground mb-1">Average Domain Authority</div>
                <div className="text-3xl font-bold">43.2</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Backlink Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <PieChart
                data={backlinkTypeData}
                dataKey="value"
                innerRadius={40}
                outerRadius={80}
                label
              />
            </div>
            <div className="mt-4 space-y-2">
              {backlinkTypeData.map((type, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: type.color }}></div>
                  <div className="flex-1 text-sm">{type.name}</div>
                  <div className="text-sm font-medium">{type.value.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground ml-2">
                    {Math.round(type.value * 100 / backlinkTypeData.reduce((sum, t) => sum + t.value, 0))}%
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Domain Industries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <BarChart 
                data={domainIndustryData}
                bars={[{ dataKey: "count", fill: "#8b5cf6", name: "Referring Domains" }]}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Backlink Growth Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <LineChart 
              data={backlinkGrowthData}
              lines={[{ dataKey: "count", stroke: "#3b82f6", name: "Number of Backlinks", strokeWidth: 2 }]}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Top Backlinks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search domains or anchor text..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Link Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="dofollow">Dofollow</SelectItem>
                <SelectItem value="nofollow">Nofollow</SelectItem>
              </SelectContent>
            </Select>
            <Select value={trafficFilter} onValueChange={setTrafficFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Traffic" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Traffic</SelectItem>
                <SelectItem value="High">High Traffic</SelectItem>
                <SelectItem value="Medium">Medium Traffic</SelectItem>
                <SelectItem value="Low">Low Traffic</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Domain</TableHead>
                  <TableHead>Anchor Text</TableHead>
                  <TableHead className="text-center">Type</TableHead>
                  <TableHead className="text-right">DA</TableHead>
                  <TableHead>First Seen</TableHead>
                  <TableHead className="text-center">Traffic</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBacklinks.map((backlink, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex items-center">
                        <Link className="h-4 w-4 mr-2 text-muted-foreground" />
                        <a href={backlink.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                          {backlink.domain}
                        </a>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate" title={backlink.anchorText}>
                      "{backlink.anchorText}"
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant={backlink.type === 'dofollow' ? 'default' : 'secondary'}>
                        {backlink.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{backlink.da}</TableCell>
                    <TableCell>{backlink.firstSeen}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant={
                        backlink.traffic === 'High' 
                          ? 'default' 
                          : backlink.traffic === 'Medium' 
                            ? 'secondary' 
                            : 'outline'
                      }>
                        {backlink.traffic}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Anchor Text Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 border rounded-md">
              <div className="text-sm font-medium mb-4">Common Anchor Text</div>
              <div className="flex flex-wrap gap-2">
                {[
                  { text: "SEO analytics", count: 285 },
                  { text: "SEO platform", count: 214 },
                  { text: "SEO dashboard", count: 156 },
                  { text: "SEO tool", count: 324 },
                  { text: "analytics solution", count: 112 },
                  { text: "seo software", count: 198 },
                  { text: "marketing analytics", count: 87 },
                  { text: "keyword tracking", count: 134 },
                  { text: "competitor analysis", count: 156 },
                  { text: "website analytics", count: 102 },
                  { text: "seo metrics", count: 86 },
                  { text: "seo report", count: 72 },
                ].map((anchor, index) => {
                  // Calculate size based on count
                  const size = anchor.count > 250 ? 'large' : anchor.count > 150 ? 'medium' : 'small';
                  
                  return (
                    <div 
                      key={index}
                      className={`rounded-full border px-3 py-1 bg-gray-100 ${
                        size === 'large' ? 'text-base font-medium' : 
                        size === 'medium' ? 'text-sm' : 'text-xs'
                      }`}
                    >
                      {anchor.text}
                      <span className="text-xs ml-1 text-muted-foreground">({anchor.count})</span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="p-4 border rounded-md">
              <div className="text-sm font-medium mb-4">Anchor Text Quality</div>
              <div className="space-y-4">
                {[
                  { type: 'Branded', percent: 42, color: 'bg-blue-500' },
                  { type: 'Keyword Rich', percent: 28, color: 'bg-green-500' },
                  { type: 'Naked URL', percent: 15, color: 'bg-yellow-500' },
                  { type: 'Generic', percent: 10, color: 'bg-purple-500' },
                  { type: 'Other', percent: 5, color: 'bg-gray-500' },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">{item.type}</span>
                      <span className="text-sm font-medium">{item.percent}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${item.color}`} 
                        style={{ width: `${item.percent}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BacklinkAnalysisTab;
