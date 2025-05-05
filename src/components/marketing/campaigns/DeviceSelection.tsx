
import React from 'react';
import { Button } from "@/components/ui/button";
import { Monitor, Smartphone, Tablet, Laptop } from 'lucide-react';

interface DeviceSelectionProps {
  selectedDevices: string[];
  onChange: (devices: string[]) => void;
}

const DeviceSelection: React.FC<DeviceSelectionProps> = ({ selectedDevices, onChange }) => {
  const devices = [
    { id: 'desktop', label: 'Desktop', icon: Monitor },
    { id: 'mobile', label: 'Mobile', icon: Smartphone },
    { id: 'tablet', label: 'Tablet', icon: Tablet },
    { id: 'laptop', label: 'Laptop', icon: Laptop },
  ];

  const toggleDevice = (device: string) => {
    if (selectedDevices.includes(device)) {
      onChange(selectedDevices.filter(d => d !== device));
    } else {
      onChange([...selectedDevices, device]);
    }
  };

  return (
    <div className="flex gap-3 flex-wrap">
      {devices.map((device) => {
        const DeviceIcon = device.icon;
        const isSelected = selectedDevices.includes(device.id);
        return (
          <Button
            key={device.id}
            type="button"
            variant={isSelected ? "default" : "outline"}
            className={`flex flex-col gap-2 h-auto py-2 px-4 ${isSelected ? 'bg-primary text-primary-foreground' : ''}`}
            onClick={() => toggleDevice(device.id)}
          >
            <DeviceIcon className="h-5 w-5" />
            <span className="text-xs">{device.label}</span>
          </Button>
        );
      })}
    </div>
  );
};

export default DeviceSelection;
