
export interface Campaign {
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

// Sample campaign data
export const campaignData: Campaign[] = [
  { 
    id: 1, 
    name: 'Summer Sale 2025',
    status: 'active',
    target: 'US, CA, UK',
    audience: '25-45, M/F',
    budget: '$5,000',
    spent: '$2,340',
    impressions: '125,430',
    clicks: '3,245',
    ctr: '2.58%',
    conversions: '156',
    cost_per_conversion: '$15.00',
    roi: '240%'
  },
  { 
    id: 2, 
    name: 'New Product Launch',
    status: 'scheduled',
    target: 'US, DE, FR',
    audience: '18-35, F',
    budget: '$7,500',
    spent: '$0',
    impressions: '0',
    clicks: '0',
    ctr: '0%',
    conversions: '0',
    cost_per_conversion: '$0',
    roi: '0%'
  },
  { 
    id: 3, 
    name: 'Holiday Special',
    status: 'ended',
    target: 'Global',
    audience: 'All Ages',
    budget: '$10,000',
    spent: '$9,876',
    impressions: '450,768',
    clicks: '12,564',
    ctr: '2.78%',
    conversions: '856',
    cost_per_conversion: '$11.54',
    roi: '320%'
  },
  { 
    id: 4, 
    name: 'Brand Awareness',
    status: 'active',
    target: 'US, CA',
    audience: '18-55, M/F',
    budget: '$3,500',
    spent: '$1,245',
    impressions: '78,965',
    clicks: '1,432',
    ctr: '1.81%',
    conversions: '89',
    cost_per_conversion: '$13.99',
    roi: '175%'
  },
  { 
    id: 5, 
    name: 'Email Campaign',
    status: 'paused',
    target: 'EU',
    audience: '25-45, M/F',
    budget: '$2,500',
    spent: '$1,100',
    impressions: '54,321',
    clicks: '2,110',
    ctr: '3.88%',
    conversions: '132',
    cost_per_conversion: '$8.33',
    roi: '265%'
  }
];
