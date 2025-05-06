
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  LogOut,
  Database,
  BarChart2,
  Menu,
  X,
  ChevronRight,
  Wrench
} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface SuperAdminLayoutProps {
  children: React.ReactNode;
  currentPage: string;
}

const SuperAdminLayout: React.FC<SuperAdminLayoutProps> = ({ children, currentPage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [adminEmail, setAdminEmail] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is logged in
    const isLoggedIn = localStorage.getItem("superAdminLoggedIn") === "true";
    const email = localStorage.getItem("superAdminEmail");
    
    if (!isLoggedIn) {
      navigate("/super-admin/login");
    } else if (email) {
      setAdminEmail(email);
    }
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem("superAdminLoggedIn");
    localStorage.removeItem("superAdminEmail");
    navigate("/super-admin/login");
  };

  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/super-admin/dashboard' },
    { name: 'Pages', icon: <FileText size={20} />, path: '/super-admin/pages' },
    { name: 'Admin Users', icon: <Users size={20} />, path: '/super-admin/admins' },
    { name: 'Features Control', icon: <Wrench size={20} />, path: '/super-admin/features' },
    { name: 'Integrations', icon: <Database size={20} />, path: '/super-admin/integrations' },
    { name: 'Analytics', icon: <BarChart2 size={20} />, path: '/super-admin/analytics' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/super-admin/settings' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar for desktop */}
      <div className="hidden lg:flex flex-col w-64 border-r bg-white">
        <div className="flex items-center gap-2 p-6 border-b">
          <div className="h-8 w-8 rounded-md bg-gradient-to-r from-purple-600 to-indigo-700 flex items-center justify-center">
            <span className="text-white font-bold">S</span>
          </div>
          <span className="text-xl font-semibold">Super Admin</span>
        </div>
        
        <div className="flex-1 overflow-auto py-4 px-3">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className={`w-full justify-start ${
                  currentPage === item.name.toLowerCase() ? 'bg-purple-50 text-purple-700' : ''
                }`}
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
              <div className="h-8 w-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-semibold">
                {adminEmail.charAt(0).toUpperCase()}
              </div>
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
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50" 
            onClick={handleSignOut}
          >
            <LogOut size={18} />
            <span className="ml-2">Sign out</span>
          </Button>
        </div>
      </div>

      {/* Mobile header and sidebar */}
      <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" 
           style={{ display: isMobileMenuOpen ? 'block' : 'none' }}
           onClick={() => setIsMobileMenuOpen(false)}>
      </div>
      
      <div className={`lg:hidden fixed inset-y-0 left-0 w-64 bg-white z-50 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-gradient-to-r from-purple-600 to-indigo-700 flex items-center justify-center">
              <span className="text-white font-bold">S</span>
            </div>
            <span className="text-xl font-semibold">Super Admin</span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>
        
        <div className="p-4">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className={`w-full justify-start ${
                  currentPage === item.name.toLowerCase() ? 'bg-purple-50 text-purple-700' : ''
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
              className="w-full justify-start text-red-600 mt-4" 
              onClick={handleSignOut}
            >
              <LogOut size={18} />
              <span className="ml-2">Sign out</span>
            </Button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b p-4 flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={() => setIsMobileMenuOpen(true)} className="mr-2">
              <Menu size={24} />
            </button>
            <div className="h-8 w-8 rounded-md bg-gradient-to-r from-purple-600 to-indigo-700 flex items-center justify-center">
              <span className="text-white font-bold">S</span>
            </div>
            <span className="text-xl font-semibold ml-2">Super Admin</span>
          </div>
        </header>

        {/* Page header and breadcrumb */}
        <div className="bg-white border-b p-4 flex items-center">
          <h1 className="text-xl font-semibold">{currentPage}</h1>
          <ChevronRight className="mx-2 text-gray-400" size={16} />
          <span className="text-gray-500">Super Admin</span>
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-auto bg-gray-50 p-4">
          <div className="container mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SuperAdminLayout;
