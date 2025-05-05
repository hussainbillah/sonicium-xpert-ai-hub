import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Check, AlertTriangle, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { BarChart, LineChart, PieChart } from "@/components/ui/custom-chart";

// Sample data for graphs
const coreWebVitalsData = [
  { name: 'LCP', score: 2.4, threshold: 2.5, color: '#22c55e' },
  { name: 'FID', score: 18, threshold: 100, color: '#22c55e' },
  { name: 'CLS', score: 0.1, threshold: 0.1, color: '#f59e0b' },
];

const pageSpeedData = [
  { name: 'Home', mobile: 65, desktop: 89 },
  { name: 'Products', mobile: 58, desktop: 82 },
  { name: 'Blog', mobile: 71, desktop: 94 },
  { name: 'Contact', mobile: 69, desktop: 91 },
];

const crawlErrorsData = [
  { name: '404', count: 12 },
  { name: 'Server Error', count: 3 },
  { name: 'Redirect', count: 24 },
  { name: 'DNS', count: 1 },
];

const schemaUsageData = [
  { name: 'Product', value: 45, color: "#3b82f6" },
  { name: 'Article', value: 20, color: "#22c55e" },
  { name: 'LocalBusiness', value: 15, color: "#f59e0b" },
  { name: 'FAQ', value: 10, color: "#8b5cf6" },
  { name: 'Other', value: 10, color: "#6b7280" },
];

const bounceRateData = Array.from({ length: 30 }, (_, i) => ({
  name: `${i + 1}`,
  rate: 40 + Math.random() * 20,
}));

// Component for showing status
const StatusBadge: React.FC<{ status: 'ok' | 'warning' | 'error' }> = ({ status }) => {
  if (status === 'ok') {
    return <div className="flex items-center text-green-500"><Check className="h-4 w-4 mr-1" /> OK</div>;
  } else if (status === 'warning') {
    return <div className="flex items-center text-amber-500"><AlertTriangle className="h-4 w-4 mr-1" /> Needs Fix</div>;
  } else {
    return <div className="flex items-center text-red-500"><X className="h-4 w-4 mr-1" /> Error</div>;
  }
};

// Component for showing score with progress bar
const ScoreBar: React.FC<{ score: number }> = ({ score }) => {
  const getColor = () => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <div className="flex items-center gap-2">
      <Progress value={score} className={`h-2 w-24 ${getColor()}`} />
      <span className="text-sm">{score}/100</span>
    </div>
  );
};

const SEOAuditTab: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("technical");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Core Web Vitals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <BarChart 
                data={coreWebVitalsData}
                bars={[{ dataKey: "score", name: "Score" }]}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Page Speed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <BarChart 
                data={pageSpeedData}
                bars={[
                  { dataKey: "mobile", fill: "#f59e0b", name: "Mobile" },
                  { dataKey: "desktop", fill: "#3b82f6", name: "Desktop" }
                ]}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Schema Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center">
              <PieChart 
                data={schemaUsageData}
                dataKey="value"
                innerRadius={40}
                outerRadius={80}
                label
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Bounce Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <LineChart 
                data={bounceRateData}
                lines={[{ dataKey: "rate", stroke: "#8b5cf6", strokeWidth: 2 }]}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Accordion 
        type="single" 
        defaultValue="technical" 
        onValueChange={setActiveCategory} 
        className="space-y-4"
      >
        <AccordionItem value="technical" className="border rounded-lg p-2">
          <AccordionTrigger className="px-4 py-2 hover:no-underline">
            <div className="flex justify-between w-full">
              <span className="font-bold">Technical SEO</span>
              <StatusBadge status="warning" />
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Crawl Errors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <BarChart config={{
                      count: { color: "#ef4444" }
                    }}>
                      <Bar 
                        dataKey="count" 
                        data={crawlErrorsData} 
                        fill="var(--color-count)" 
                      />
                    </BarChart>
                  </div>
                </CardContent>
              </Card>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border rounded-md">
                  <div className="space-y-1">
                    <div className="font-medium">SSL Certificate</div>
                    <div className="text-sm text-muted-foreground">Valid and secure</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <StatusBadge status="ok" />
                    <ScoreBar score={100} />
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 border rounded-md">
                  <div className="space-y-1">
                    <div className="font-medium">XML Sitemap</div>
                    <div className="text-sm text-muted-foreground">Present but has errors</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <StatusBadge status="warning" />
                    <ScoreBar score={75} />
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 border rounded-md">
                  <div className="space-y-1">
                    <div className="font-medium">Robots.txt</div>
                    <div className="text-sm text-muted-foreground">Present and valid</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <StatusBadge status="ok" />
                    <ScoreBar score={100} />
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 border rounded-md">
                  <div className="space-y-1">
                    <div className="font-medium">Canonical Tags</div>
                    <div className="text-sm text-muted-foreground">Issues on 4 pages</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <StatusBadge status="warning" />
                    <ScoreBar score={65} />
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="onpage" className="border rounded-lg p-2">
          <AccordionTrigger className="px-4 py-2 hover:no-underline">
            <div className="flex justify-between w-full">
              <span className="font-bold">OnPage SEO (Product/Category)</span>
              <StatusBadge status="error" />
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex justify-between items-center p-4 border rounded-md">
                  <div className="space-y-1">
                    <div className="font-medium">Meta Titles</div>
                    <div className="text-sm text-muted-foreground">12 pages have issues</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <StatusBadge status="error" />
                    <ScoreBar score={45} />
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 border rounded-md">
                  <div className="space-y-1">
                    <div className="font-medium">Meta Descriptions</div>
                    <div className="text-sm text-muted-foreground">8 pages have issues</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <StatusBadge status="warning" />
                    <ScoreBar score={62} />
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 border rounded-md">
                  <div className="space-y-1">
                    <div className="font-medium">H1 Tags</div>
                    <div className="text-sm text-muted-foreground">Multiple H1s on 5 pages</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <StatusBadge status="warning" />
                    <ScoreBar score={70} />
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 border rounded-md">
                  <div className="space-y-1">
                    <div className="font-medium">Image Alt Text</div>
                    <div className="text-sm text-muted-foreground">42 images missing alt text</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <StatusBadge status="error" />
                    <ScoreBar score={35} />
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 border rounded-md">
                  <div className="space-y-1">
                    <div className="font-medium">URL Structure</div>
                    <div className="text-sm text-muted-foreground">Good overall structure</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <StatusBadge status="ok" />
                    <ScoreBar score={90} />
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 border rounded-md">
                  <div className="space-y-1">
                    <div className="font-medium">Content Quality</div>
                    <div className="text-sm text-muted-foreground">Thin content on 7 pages</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <StatusBadge status="warning" />
                    <ScoreBar score={68} />
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="offpage" className="border rounded-lg p-2">
          <AccordionTrigger className="px-4 py-2 hover:no-underline">
            <div className="flex justify-between w-full">
              <span className="font-bold">OffPage & Conversion SEO</span>
              <StatusBadge status="ok" />
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border rounded-md">
                  <div className="space-y-1">
                    <div className="font-medium">Backlink Profile</div>
                    <div className="text-sm text-muted-foreground">324 backlinks from 89 domains</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <StatusBadge status="ok" />
                    <ScoreBar score={82} />
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 border rounded-md">
                  <div className="space-y-1">
                    <div className="font-medium">Social Signals</div>
                    <div className="text-sm text-muted-foreground">Good engagement</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <StatusBadge status="ok" />
                    <ScoreBar score={85} />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border rounded-md">
                  <div className="space-y-1">
                    <div className="font-medium">Conversion Rate</div>
                    <div className="text-sm text-muted-foreground">3.2% (industry avg: 2.8%)</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <StatusBadge status="ok" />
                    <ScoreBar score={88} />
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 border rounded-md">
                  <div className="space-y-1">
                    <div className="font-medium">Call-to-Action</div>
                    <div className="text-sm text-muted-foreground">Effective placement</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <StatusBadge status="ok" />
                    <ScoreBar score={92} />
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="ux" className="border rounded-lg p-2">
          <AccordionTrigger className="px-4 py-2 hover:no-underline">
            <div className="flex justify-between w-full">
              <span className="font-bold">UX & Analytics</span>
              <StatusBadge status="warning" />
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border rounded-md">
                  <div className="space-y-1">
                    <div className="font-medium">Mobile Optimization</div>
                    <div className="text-sm text-muted-foreground">Some issues on product pages</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <StatusBadge status="warning" />
                    <ScoreBar score={72} />
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 border rounded-md">
                  <div className="space-y-1">
                    <div className="font-medium">Page Load Speed</div>
                    <div className="text-sm text-muted-foreground">Average 3.2s (mobile)</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <StatusBadge status="warning" />
                    <ScoreBar score={68} />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border rounded-md">
                  <div className="space-y-1">
                    <div className="font-medium">Analytics Setup</div>
                    <div className="text-sm text-muted-foreground">Properly configured</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <StatusBadge status="ok" />
                    <ScoreBar score={95} />
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 border rounded-md">
                  <div className="space-y-1">
                    <div className="font-medium">Event Tracking</div>
                    <div className="text-sm text-muted-foreground">Partial implementation</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <StatusBadge status="warning" />
                    <ScoreBar score={65} />
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default SEOAuditTab;
