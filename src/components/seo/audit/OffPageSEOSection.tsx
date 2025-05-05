
import React from 'react';
import StatusBadge from './StatusBadge';
import ScoreBar from './ScoreBar';

const OffPageSEOSection: React.FC = () => {
  return (
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
  );
};

export default OffPageSEOSection;
