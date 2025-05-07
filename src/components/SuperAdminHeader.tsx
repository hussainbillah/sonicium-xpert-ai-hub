
import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Menu, X, ChevronRight, Search, Bell, User, Settings, LogOut
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SuperAdminHeaderProps {
  currentPage: string;
  adminEmail: string;
  handleSignOut: () => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

const SuperAdminHeader: React.FC<SuperAdminHeaderProps> = ({ 
  currentPage, adminEmail, handleSignOut, isMobileMenuOpen, setIsMobileMenuOpen 
}) => {
  return (
    <>
      {/* Mobile Header */}
      <header className="sticky top-0 z-30 lg:hidden bg-white border-b p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center">
          <button onClick={() => setIsMobileMenuOpen(true)} className="mr-2">
            <Menu size={24} />
          </button>
          <div className="h-8 w-8 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-700 flex items-center justify-center">
            <span className="text-white font-bold font-inter">S</span>
          </div>
          <span className="text-xl font-semibold ml-2 font-inter">Super Admin</span>
        </div>
      </header>

      {/* Top bar for desktop */}
      <header className="sticky top-0 z-30 hidden lg:flex items-center justify-between bg-white border-b px-6 py-3 shadow-sm">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold font-inter">{currentPage}</h1>
          <ChevronRight className="mx-2 text-gray-400" size={16} />
          <span className="text-gray-500">Super Admin</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative rounded-xl">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search..." 
              className="pl-9 w-[200px] rounded-xl" 
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-xl relative">
                <Bell size={20} />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 rounded-xl">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-96 overflow-auto">
                <div className="p-3 hover:bg-gray-50 cursor-pointer">
                  <p className="font-medium">New user registered</p>
                  <p className="text-sm text-gray-500">John Doe created an account</p>
                  <p className="text-xs text-gray-400 mt-1">5 minutes ago</p>
                </div>
                <div className="p-3 hover:bg-gray-50 cursor-pointer">
                  <p className="font-medium">API usage alert</p>
                  <p className="text-sm text-gray-500">Account approaching usage limits</p>
                  <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="rounded-xl flex items-center gap-2">
                <Avatar className="h-8 w-8 rounded-xl">
                  <AvatarFallback className="bg-purple-100 text-purple-700 rounded-xl">
                    {adminEmail.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-xl">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User size={16} className="mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings size={16} className="mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                <LogOut size={16} className="mr-2" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Backdrop for mobile menu */}
      <div 
        className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" 
        style={{ display: isMobileMenuOpen ? 'block' : 'none' }}
        onClick={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};

export default SuperAdminHeader;
