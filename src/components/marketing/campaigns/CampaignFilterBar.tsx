
import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";

interface CampaignFilterBarProps {
  campaignCount: number;
}

const CampaignFilterBar: React.FC<CampaignFilterBarProps> = ({ campaignCount }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Filter className="h-4 w-4" /> Filter
        </Button>
        <Select defaultValue="all">
          <SelectTrigger className="w-[140px] h-9">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
            <SelectItem value="ended">Ended</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="performance">
          <SelectTrigger className="w-[160px] h-9">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="performance">Performance</SelectItem>
            <SelectItem value="budget">Budget</SelectItem>
            <SelectItem value="date">Date Created</SelectItem>
            <SelectItem value="name">Campaign Name</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">{campaignCount} campaigns</span>
        <Button variant="outline" size="sm">
          Export
        </Button>
      </div>
    </div>
  );
};

export default CampaignFilterBar;
