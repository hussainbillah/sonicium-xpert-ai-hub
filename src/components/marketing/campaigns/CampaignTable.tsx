
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import StatusBadge from './StatusBadge';

interface Campaign {
  id: number;
  name: string;
  status: string;
  target: string;
  audience: string;
  budget: string;
  spent: string;
  impressions: string;
  clicks: string;
  ctr: string;
  conversions: string;
  cost_per_conversion: string;
  roi: string;
}

interface CampaignTableProps {
  campaigns: Campaign[];
}

const CampaignTable: React.FC<CampaignTableProps> = ({ campaigns }) => {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Target</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Spent</TableHead>
              <TableHead>Impressions</TableHead>
              <TableHead>Clicks</TableHead>
              <TableHead>CTR</TableHead>
              <TableHead>Conversions</TableHead>
              <TableHead>ROI</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaigns.map((campaign) => (
              <TableRow key={campaign.id}>
                <TableCell className="font-medium">{campaign.name}</TableCell>
                <TableCell><StatusBadge status={campaign.status} /></TableCell>
                <TableCell>{campaign.target}</TableCell>
                <TableCell>{campaign.budget}</TableCell>
                <TableCell>{campaign.spent}</TableCell>
                <TableCell>{campaign.impressions}</TableCell>
                <TableCell>{campaign.clicks}</TableCell>
                <TableCell>{campaign.ctr}</TableCell>
                <TableCell>{campaign.conversions}</TableCell>
                <TableCell className="text-green-600 font-medium">{campaign.roi}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CampaignTable;
