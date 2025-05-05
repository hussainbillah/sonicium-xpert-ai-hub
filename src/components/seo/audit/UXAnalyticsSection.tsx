
import React from 'react';
import StatusBadge from './StatusBadge';
import ScoreBar from './ScoreBar';

const UXAnalyticsSection: React.FC = () => {
  return (
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
  );
};

export default UXAnalyticsSection;
