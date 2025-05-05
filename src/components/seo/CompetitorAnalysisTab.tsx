
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from "@/components/ui/chart";
import { Bar } from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Sample data for competitor analysis
const competitorMetrics = [
  { 
    name: 'Your Site', 
    domainAuthority: 45, 
    pageAuthority: 48,
    contentDepth: 65,
    keywordCoverage: 58,
    uxScore: 72,
    backlinkCount: 1245,
    color: "#3b82f6" // blue
  },
  { 
    name: 'Competitor A', 
    domainAuthority: 62, 
    pageAuthority: 65,
    contentDepth: 78,
    keywordCoverage: 72,
    uxScore: 68,
    backlinkCount: 3580,
    color: "#ef4444" // red
  },
  { 
    name: 'Competitor B', 
    domainAuthority: 58, 
    pageAuthority: 53,
    contentDepth: 70,
    keywordCoverage: 65,
    uxScore: 75,
    backlinkCount: 2890,
    color: "#22c55e" // green
  },
  { 
    name: 'Competitor C', 
    domainAuthority: 39, 
    pageAuthority: 42,
    contentDepth: 55,
    keywordCoverage: 48,
    uxScore: 62,
    backlinkCount: 980,
    color: "#f59e0b" // amber
  },
];

const keywordOverlap = [
  { name: 'Your Site', value: 580, color: "#3b82f6" },
  { name: 'Competitor A Only', value: 920, color: "#ef4444" },
  { name: 'Competitor B Only', value: 850, color: "#22c55e" },
  { name: 'Common All Sites', value: 320, color: "#8b5cf6" },
];

const contentFreshness = [
  { 
    name: 'Your Site', 
    updated30: 35, 
    updated90: 25, 
    older: 40, 
  },
  { 
    name: 'Competitor A', 
    updated30: 55, 
    updated90: 30, 
    older: 15, 
  },
  { 
    name: 'Competitor B', 
    updated30: 40, 
    updated90: 35, 
    older: 25, 
  },
  { 
    name: 'Competitor C', 
    updated30: 25, 
    updated90: 30, 
    older: 45, 
  },
];

const CompetitorAnalysisTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Domain & Page Authority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <BarChart config={{
                domainAuthority: { color: "#3b82f6" },
                pageAuthority: { color: "#8b5cf6" }
              }}>
                <Bar 
                  dataKey="domainAuthority" 
                  data={competitorMetrics} 
                  name="Domain Authority"
                  fill="var(--color-domainAuthority)" 
                />
                <Bar 
                  dataKey="pageAuthority" 
                  data={competitorMetrics} 
                  name="Page Authority"
                  fill="var(--color-pageAuthority)" 
                />
              </BarChart>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Content & Keyword Coverage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <BarChart config={{
                contentDepth: { color: "#22c55e" },
                keywordCoverage: { color: "#f59e0b" }
              }}>
                <Bar 
                  dataKey="contentDepth" 
                  data={competitorMetrics} 
                  name="Content Depth"
                  fill="var(--color-contentDepth)" 
                />
                <Bar 
                  dataKey="keywordCoverage" 
                  data={competitorMetrics} 
                  name="Keyword Coverage"
                  fill="var(--color-keywordCoverage)" 
                />
              </BarChart>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Competitor Analysis Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Website</TableHead>
                  <TableHead className="text-right">Domain Authority</TableHead>
                  <TableHead className="text-right">Page Authority</TableHead>
                  <TableHead className="text-right">UX Score</TableHead>
                  <TableHead className="text-right">Backlinks</TableHead>
                  <TableHead className="text-right">Ranking Keywords</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {competitorMetrics.map((competitor, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: competitor.color }}></div>
                        {competitor.name}
                        {competitor.name === 'Your Site' && <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">You</span>}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{competitor.domainAuthority}/100</TableCell>
                    <TableCell className="text-right">{competitor.pageAuthority}/100</TableCell>
                    <TableCell className="text-right">{competitor.uxScore}/100</TableCell>
                    <TableCell className="text-right">{competitor.backlinkCount.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      {(competitor.keywordCoverage * 25).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Keyword Overlap</CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="h-80 flex justify-center items-center">
              {/* Simple Venn diagram visualization */}
              <div className="relative w-full h-full">
                <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-opacity-60 flex items-center justify-center text-white font-bold" style={{ backgroundColor: 'rgba(59, 130, 246, 0.5)' }}>
                  Your Site
                  <br />
                  {keywordOverlap[0].value} keywords
                </div>
                <div className="absolute top-1/2 left-2/4 transform -translate-x-1/4 -translate-y-1/2 w-48 h-48 rounded-full bg-opacity-60 flex items-center justify-center text-white font-bold" style={{ backgroundColor: 'rgba(239, 68, 68, 0.5)' }}>
                  Comp. A
                  <br />
                  {keywordOverlap[1].value} keywords
                </div>
                <div className="absolute top-1/2 left-3/4 transform -translate-x-3/4 -translate-y-1/2 w-48 h-48 rounded-full bg-opacity-60 flex items-center justify-center text-white font-bold" style={{ backgroundColor: 'rgba(34, 197, 94, 0.5)' }}>
                  Comp. B
                  <br />
                  {keywordOverlap[2].value} keywords
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-opacity-80 flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: 'rgba(139, 92, 246, 0.8)' }}>
                  Common
                  <br />
                  {keywordOverlap[3].value}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Content Freshness</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <BarChart config={{
                updated30: { color: "#22c55e" },
                updated90: { color: "#f59e0b" },
                older: { color: "#ef4444" }
              }}>
                <Bar 
                  dataKey="updated30" 
                  data={contentFreshness} 
                  name="Last 30 Days"
                  stackId="stack"
                  fill="var(--color-updated30)" 
                />
                <Bar 
                  dataKey="updated90" 
                  data={contentFreshness} 
                  name="30-90 Days"
                  stackId="stack"
                  fill="var(--color-updated90)" 
                />
                <Bar 
                  dataKey="older" 
                  data={contentFreshness} 
                  name="Older Content"
                  stackId="stack"
                  fill="var(--color-older)" 
                />
              </BarChart>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">SERP Visibility Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                {name: 'Your Site', value: '34%', change: '+5%', color: 'text-green-500'},
                {name: 'Competitor A', value: '56%', change: '+2%', color: 'text-green-500'},
                {name: 'Competitor B', value: '48%', change: '-3%', color: 'text-red-500'},
                {name: 'Competitor C', value: '27%', change: '+1%', color: 'text-green-500'}
              ].map((item, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="text-sm text-muted-foreground">{item.name}</div>
                  <div className="text-2xl font-bold mt-2">{item.value}</div>
                  <div className={`text-sm ${item.color} mt-1`}>{item.change} past 30 days</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompetitorAnalysisTab;
