
import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  LayoutDashboard, FileText, Users, Settings, LogOut,
  Database, BarChart2, CreditCard, Layers, ActivitySquare
} from "lucide-react";

interface SuperAdminSidebarProps {
  currentPage: string;
  adminEmail: string;
  handleSignOut: () => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

const SuperAdminSidebar: React.FC<SuperAdminSidebarProps> = ({ 
  currentPage, adminEmail, handleSignOut, isMobileMenuOpen, setIsMobileMenuOpen 
}) => {
  const navigate = useNavigate();
  
  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/super-admin/dashboard' },
    { name: 'Page Builder', icon: <FileText size={20} />, path: '/super-admin/pages' },
    { name: 'Users & Admins', icon: <Users size={20} />, path: '/super-admin/admins' },
    { name: 'API Integrations', icon: <Database size={20} />, path: '/super-admin/integrations' },
    { name: 'API Usage & Limits', icon: <BarChart2 size={20} />, path: '/super-admin/analytics' },
    { name: 'Plan Management', icon: <CreditCard size={20} />, path: '/super-admin/plans' },
    { name: 'Activity Logs', icon: <ActivitySquare size={20} />, path: '/super-admin/logs' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/super-admin/settings' },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col fixed inset-y-0 left-0 w-64 bg-white border-r shadow-sm">
        <div className="flex items-center gap-2 p-6 border-b">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-700 flex items-center justify-center">
            <span className="text-white font-bold font-inter">S</span>
          </div>
          <span className="text-xl font-semibold font-inter">Super Admin</span>
        </div>
        
        <div className="flex-1 overflow-auto py-6 px-4">
          <nav className="space-y-1.5">
            {navItems.map((item) => (
              <Button
                key={item.name}
                variant={currentPage === item.name.toLowerCase() ? "secondary" : "ghost"}
                className={`w-full justify-start rounded-xl py-6 ${
                  currentPage === item.name.toLowerCase() ? 'bg-gray-100 text-purple-700' : ''
                } hover:bg-gray-100`}
                onClick={() => navigate(item.path)}
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </Button>
            ))}
          </nav>
        </div>
        
        <div className="p-4 border-t">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 rounded-xl">
                <AvatarFallback className="bg-purple-100 text-purple-700 rounded-xl">
                  {adminEmail.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="text-sm font-medium">Super Admin</p>
                <p className="text-xs text-gray-500 truncate max-w-[160px]">
                  {adminEmail}
                </p>
              </div>
            </div>
          </div>
          <Button 
            variant="outline"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl" 
            onClick={handleSignOut}
          >
            <LogOut size={18} />
            <span className="ml-2">Sign out</span>
          </Button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`lg:hidden fixed inset-y-0 left-0 w-64 bg-white z-50 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-700 flex items-center justify-center">
              <span className="text-white font-bold font-inter">S</span>
            </div>
            <span className="text-xl font-semibold font-inter">Super Admin</span>
          </div>
        </div>
        
        <div className="p-4">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className={`w-full justify-start rounded-xl ${
                  currentPage === item.name.toLowerCase() ? 'bg-gray-100 text-purple-700' : ''
                }`}
                onClick={() => {
                  navigate(item.path);
                  setIsMobileMenuOpen(false);
                }}
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </Button>
            ))}
            
            <Button 
              variant="outline"
              className="w-full justify-start text-red-600 mt-4 rounded-xl" 
              onClick={handleSignOut}
            >
              <LogOut size={18} />
              <span className="ml-2">Sign out</span>
            </Button>
          </nav>
        </div>
      </div>
    </>
  );
};

export default SuperAdminSidebar;
