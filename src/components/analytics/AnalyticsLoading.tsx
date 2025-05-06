
import React from "react";
import { Loader2 } from "lucide-react";

const AnalyticsLoading: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-24">
      <Loader2 className="mr-2 h-6 w-6 animate-spin" />
      Loading analytics data...
    </div>
  );
};

export default AnalyticsLoading;
