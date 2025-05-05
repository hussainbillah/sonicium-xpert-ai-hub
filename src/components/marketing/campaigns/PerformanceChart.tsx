
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const PerformanceChart: React.FC = () => {
  return (
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
  );
};

export default PerformanceChart;
