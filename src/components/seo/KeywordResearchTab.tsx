
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BarChart, LineChart } from "@/components/ui/chart";
import { Bar, Line } from "recharts";
import { Search } from "lucide-react";
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

// Sample data for charts
const volumeTrendData = [
  { month: 'Jan', volume: 1200 },
  { month: 'Feb', volume: 1400 },
  { month: 'Mar', volume: 1800 },
  { month: 'Apr', volume: 2200 },
  { month: 'May', volume: 1900 },
  { month: 'Jun', volume: 2100 },
  { month: 'Jul', volume: 2400 },
  { month: 'Aug', volume: 2600 },
  { month: 'Sep', volume: 2300 },
  { month: 'Oct', volume: 2500 },
  { month: 'Nov', volume: 2700 },
  { month: 'Dec', volume: 3000 },
];

const keywordData = [
  { keyword: 'ecommerce seo services', volume: 2400, difficulty: 62, cpc: 5.40, competition: 'high', intent: 'commercial' },
  { keyword: 'best seo tools', volume: 6500, difficulty: 75, cpc: 7.80, competition: 'high', intent: 'informational' },
  { keyword: 'seo audit tool', volume: 4200, difficulty: 58, cpc: 4.30, competition: 'medium', intent: 'transactional' },
  { keyword: 'how to improve seo ranking', volume: 8100, difficulty: 43, cpc: 3.20, competition: 'low', intent: 'informational' },
  { keyword: 'seo consultant services', volume: 1900, difficulty: 51, cpc: 6.10, competition: 'medium', intent: 'commercial' },
  { keyword: 'ecommerce seo strategy', volume: 3400, difficulty: 67, cpc: 5.80, competition: 'high', intent: 'informational' },
  { keyword: 'local seo services', volume: 5600, difficulty: 54, cpc: 8.20, competition: 'high', intent: 'commercial' },
  { keyword: 'seo competitor analysis', volume: 3200, difficulty: 48, cpc: 4.50, competition: 'medium', intent: 'informational' },
  { keyword: 'seo rank tracker', volume: 2800, difficulty: 39, cpc: 3.90, competition: 'low', intent: 'transactional' },
  { keyword: 'how to do keyword research', volume: 6100, difficulty: 46, cpc: 3.60, competition: 'medium', intent: 'informational' },
];

const cpcData = keywordData.map(item => ({
  keyword: item.keyword,
  cpc: item.cpc
}));

const KeywordResearchTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [intentFilter, setIntentFilter] = useState<string>('all');
  const [competitionFilter, setCompetitionFilter] = useState<string>('all');
  
  const filteredKeywords = keywordData.filter(keyword => {
    const matchesSearch = searchTerm === '' || keyword.keyword.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIntent = intentFilter === 'all' || keyword.intent === intentFilter;
    const matchesCompetition = competitionFilter === 'all' || keyword.competition === competitionFilter;
    
    return matchesSearch && matchesIntent && matchesCompetition;
  });

  // Function to get the color for difficulty
  const getDifficultyColor = (difficulty: number) => {
    if (difficulty < 40) return "bg-green-500";
    if (difficulty < 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search keywords..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Select value={intentFilter} onValueChange={setIntentFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Intent" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Intents</SelectItem>
              <SelectItem value="informational">Informational</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="transactional">Transactional</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={competitionFilter} onValueChange={setCompetitionFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Competition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Competition</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Search Volume Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <LineChart config={{
                volume: { color: "#8b5cf6" }
              }}>
                <Line
                  type="monotone"
                  dataKey="volume"
                  data={volumeTrendData}
                  stroke="var(--color-volume)"
                  strokeWidth={2}
                />
              </LineChart>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Cost Per Click (CPC)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <BarChart config={{
                cpc: { color: "#22c55e" }
              }}>
                <Bar 
                  dataKey="cpc" 
                  data={cpcData} 
                  fill="var(--color-cpc)" 
                />
              </BarChart>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Keyword Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Keyword</TableHead>
                  <TableHead className="text-right">Search Volume</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead className="text-right">CPC ($)</TableHead>
                  <TableHead>Competition</TableHead>
                  <TableHead>Intent</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredKeywords.map((keyword, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{keyword.keyword}</TableCell>
                    <TableCell className="text-right">{keyword.volume.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className={`h-2.5 rounded-full ${getDifficultyColor(keyword.difficulty)}`} 
                            style={{ width: `${keyword.difficulty}%` }}
                          ></div>
                        </div>
                        <span className="text-xs">{keyword.difficulty}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">${keyword.cpc.toFixed(2)}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        keyword.competition === 'high' 
                          ? 'bg-red-100 text-red-800' 
                          : keyword.competition === 'medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                      }`}>
                        {keyword.competition}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        keyword.intent === 'commercial' 
                          ? 'bg-blue-100 text-blue-800' 
                          : keyword.intent === 'transactional'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-gray-100 text-gray-800'
                      }`}>
                        {keyword.intent}
                      </span>
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
          <CardTitle className="text-lg">Keyword Clustering</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 h-64 overflow-hidden border rounded-md flex flex-wrap gap-4 content-start">
            {[
              { name: 'SEO Services', size: 'large', color: 'bg-blue-100 text-blue-800 border-blue-300' },
              { name: 'SEO Tools', size: 'medium', color: 'bg-green-100 text-green-800 border-green-300' },
              { name: 'SEO Strategy', size: 'medium', color: 'bg-purple-100 text-purple-800 border-purple-300' },
              { name: 'SEO Consulting', size: 'small', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
              { name: 'SEO Rankings', size: 'medium', color: 'bg-red-100 text-red-800 border-red-300' },
              { name: 'SEO Audit', size: 'large', color: 'bg-indigo-100 text-indigo-800 border-indigo-300' },
              { name: 'Local SEO', size: 'medium', color: 'bg-pink-100 text-pink-800 border-pink-300' },
              { name: 'Content SEO', size: 'small', color: 'bg-teal-100 text-teal-800 border-teal-300' },
              { name: 'Technical SEO', size: 'medium', color: 'bg-orange-100 text-orange-800 border-orange-300' },
              { name: 'E-commerce SEO', size: 'large', color: 'bg-cyan-100 text-cyan-800 border-cyan-300' },
              { name: 'SEO Analysis', size: 'small', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
            ].map((cluster, index) => (
              <div 
                key={index}
                className={`rounded-full border px-4 py-2 flex items-center justify-center ${cluster.color} ${
                  cluster.size === 'large' ? 'text-lg h-20 w-44' : 
                  cluster.size === 'medium' ? 'h-16 w-36' : 'h-12 w-28'
                }`}
              >
                {cluster.name}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KeywordResearchTab;
