
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface StatItem {
  label: string;
  value: string;
  change: string;
}

const StatsCard: React.FC = () => {
  const stats: StatItem[] = [
    {
      label: "Total Clicks",
      value: "19,351",
      change: "+12.5%"
    },
    {
      label: "Average CTR",
      value: "2.73%",
      change: "+1.8%"
    },
    {
      label: "Conversions",
      value: "1,233",
      change: "+23.4%"
    },
    {
      label: "Total ROI",
      value: "205%",
      change: "+15.2%"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Stats</CardTitle>
        <CardDescription>Current period vs. previous</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">{stat.label}</span>
                <span className="text-green-600">{stat.change}</span>
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
