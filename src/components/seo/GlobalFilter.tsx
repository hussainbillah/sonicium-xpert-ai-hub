
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar, Globe, Smartphone, Download, Filter } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GlobalFilterProps {
  onFilterChange?: (filters: {
    dateRange: { from: Date | undefined; to: Date | undefined };
    country: string;
    device: string;
  }) => void;
}

const GlobalFilter: React.FC<GlobalFilterProps> = ({ onFilterChange }) => {
  const [date, setDate] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    to: new Date()
  });
  const [country, setCountry] = useState<string>("us");
  const [device, setDevice] = useState<string>("all");

  const handleDateChange = (dateRange: { from: Date | undefined; to: Date | undefined }) => {
    setDate(dateRange);
    if (onFilterChange) {
      onFilterChange({ dateRange, country, device });
    }
  };

  const handleCountryChange = (value: string) => {
    setCountry(value);
    if (onFilterChange) {
      onFilterChange({ dateRange: date, country: value, device });
    }
  };

  const handleDeviceChange = (value: string) => {
    setDevice(value);
    if (onFilterChange) {
      onFilterChange({ dateRange: date, country, device: value });
    }
  };

  const handleDownloadPDF = () => {
    // In a real app, this would generate and download a PDF report
    alert("Downloading PDF report...");
  };

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>
              {date.from ? date.from.toLocaleDateString() : "Start date"} - 
              {date.to ? date.to.toLocaleDateString() : "End date"}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <CalendarComponent
            initialFocus
            mode="range"
            defaultMonth={date.from}
            selected={date}
            onSelect={(range) => handleDateChange(range || { from: undefined, to: undefined })}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span>Country</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-60">
          <Select value={country} onValueChange={handleCountryChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="ca">Canada</SelectItem>
              <SelectItem value="au">Australia</SelectItem>
              <SelectItem value="global">Global</SelectItem>
            </SelectContent>
          </Select>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Smartphone className="h-4 w-4" />
            <span>Device</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-60">
          <Select value={device} onValueChange={handleDeviceChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select device" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Devices</SelectItem>
              <SelectItem value="mobile">Mobile</SelectItem>
              <SelectItem value="desktop">Desktop</SelectItem>
              <SelectItem value="tablet">Tablet</SelectItem>
            </SelectContent>
          </Select>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>More Filters</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-4">
            <h4 className="font-medium">Additional Filters</h4>
            <div className="space-y-2">
              <h5 className="text-sm font-medium">Platform</h5>
              <Select defaultValue="google">
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="google">Google</SelectItem>
                  <SelectItem value="bing">Bing</SelectItem>
                  <SelectItem value="yahoo">Yahoo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <Button 
        variant="default" 
        className="ml-auto flex items-center gap-2 bg-sonicium-600 hover:bg-sonicium-700"
        onClick={handleDownloadPDF}
      >
        <Download className="h-4 w-4" />
        <span>Download PDF Report</span>
      </Button>
    </div>
  );
};

export default GlobalFilter;
