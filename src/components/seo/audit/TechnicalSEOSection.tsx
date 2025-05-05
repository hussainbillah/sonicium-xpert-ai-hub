
import React from 'react';
import StatusBadge from './StatusBadge';
import ScoreBar from './ScoreBar';
import { CrawlErrorsChart } from './DashboardCharts';
import { crawlErrorsData } from './SampleData';

const TechnicalSEOSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <CrawlErrorsChart data={crawlErrorsData} />
      
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
  );
};

export default TechnicalSEOSection;
