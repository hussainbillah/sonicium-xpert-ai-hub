
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  timeframe: string;
  isPositive: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, timeframe, isPositive }) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="text-sm font-medium text-gray-500">{title}</div>
        <div className="text-2xl font-bold mt-1">{value}</div>
        <div className="flex items-center mt-1">
          <span className={`flex items-center text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <ArrowUp className="mr-1 h-4 w-4" /> : <ArrowDown className="mr-1 h-4 w-4" />}
            {change}
          </span>
          <span className="text-sm text-gray-500 ml-1">{timeframe}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
