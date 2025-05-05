
import React from 'react';
import { Check, AlertTriangle, X } from "lucide-react";

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

export default StatusBadge;
