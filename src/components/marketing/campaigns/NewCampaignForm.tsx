
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import DeviceSelection from './DeviceSelection';

interface NewCampaignFormProps {
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const NewCampaignForm: React.FC<NewCampaignFormProps> = ({ onSubmit, onCancel }) => {
  const [campaignName, setCampaignName] = useState('');
  const [targetCountry, setTargetCountry] = useState('');
  const [ageRange, setAgeRange] = useState([18, 65]);
  const [gender, setGender] = useState('all');
  const [interests, setInterests] = useState<string[]>([]);
  const [devices, setDevices] = useState<string[]>(['desktop', 'mobile']);
  const [budget, setBudget] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  
  const interestOptions = [
    { id: 'tech', label: 'Technology' },
    { id: 'fashion', label: 'Fashion' },
    { id: 'sports', label: 'Sports' },
    { id: 'travel', label: 'Travel' },
    { id: 'food', label: 'Food & Dining' },
    { id: 'health', label: 'Health & Fitness' },
    { id: 'entertainment', label: 'Entertainment' },
    { id: 'education', label: 'Education' }
  ];
  
  const handleInterestChange = (interest: string) => {
    setInterests(prev => {
      if (prev.includes(interest)) {
        return prev.filter(item => item !== interest);
      } else {
        return [...prev, interest];
      }
    });
  };
  
  return (
    <form onSubmit={onSubmit} className="space-y-6 py-4">
      <Tabs defaultValue="basic">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="targeting">Audience Targeting</TabsTrigger>
          <TabsTrigger value="budget">Budget & Schedule</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic" className="space-y-4 mt-4">
          <div>
            <Label htmlFor="name">Campaign Name</Label>
            <Input
              id="name"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              placeholder="Enter campaign name"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="country">Target Country</Label>
            <Select value={targetCountry} onValueChange={setTargetCountry}>
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="au">Australia</SelectItem>
                <SelectItem value="de">Germany</SelectItem>
                <SelectItem value="fr">France</SelectItem>
                <SelectItem value="global">Global (All Countries)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label>Device Targeting</Label>
            <div className="mt-2">
              <DeviceSelection
                selectedDevices={devices}
                onChange={setDevices}
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="targeting" className="space-y-4 mt-4">
          <div>
            <Label>Age Range ({ageRange[0]} - {ageRange[1]} years)</Label>
            <div className="pt-6 px-2">
              <Slider
                min={13}
                max={90}
                step={1}
                value={ageRange}
                onValueChange={setAgeRange}
              />
            </div>
          </div>
          
          <div>
            <Label>Gender</Label>
            <RadioGroup value={gender} onValueChange={setGender} className="flex space-x-4 mt-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">Female</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all-genders" />
                <Label htmlFor="all-genders">All</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div>
            <Label>Interests & Behaviors</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {interestOptions.map((interest) => (
                <div key={interest.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`interest-${interest.id}`}
                    checked={interests.includes(interest.id)}
                    onCheckedChange={() => handleInterestChange(interest.id)}
                  />
                  <Label htmlFor={`interest-${interest.id}`}>{interest.label}</Label>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="budget" className="space-y-4 mt-4">
          <div>
            <Label htmlFor="budget">Campaign Budget ($)</Label>
            <Input
              id="budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              type="number"
              min="1"
              step="0.01"
              placeholder="Enter budget amount"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal mt-2"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div>
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal mt-2"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    disabled={(date) => {
                      return startDate ? date < startDate : false;
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end space-x-2">
        <Button 
          variant="outline" 
          type="button"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button type="submit" className="bg-sonicium-600 hover:bg-sonicium-700">
          Create Campaign
        </Button>
      </div>
    </form>
  );
};

export default NewCampaignForm;
