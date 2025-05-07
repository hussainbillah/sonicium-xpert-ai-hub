
import React from 'react';
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

interface DarkModeToggleProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleDarkMode}
      className="rounded-xl"
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
    </Button>
  );
};

export default DarkModeToggle;
