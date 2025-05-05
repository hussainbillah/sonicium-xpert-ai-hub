
import React from 'react';
import StatusBadge from './StatusBadge';
import ScoreBar from './ScoreBar';

const OnPageSEOSection: React.FC = () => {
  return (
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
  );
};

export default OnPageSEOSection;
