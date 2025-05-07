
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  timeframe?: string;
  isPositive?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export function StatsCard({
  title,
  value,
  change,
  timeframe,
  isPositive = true,
  icon,
  className,
}: StatsCardProps) {
  return (
    <Card className={cn("overflow-hidden rounded-2xl shadow-sm", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {(change || timeframe) && (
          <p className="text-xs text-muted-foreground mt-1">
            {change && (
              <span
                className={cn(
                  "mr-1",
                  isPositive ? "text-green-600" : "text-red-600"
                )}
              >
                {change}
              </span>
            )}
            {timeframe && <span>{timeframe}</span>}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
