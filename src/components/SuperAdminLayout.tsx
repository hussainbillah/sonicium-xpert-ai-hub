
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  LayoutDashboard, FileText, Users, Settings, LogOut,
  Database, BarChart2, Menu, X, ChevronRight, Wrench,
  Search, Bell, Globe, CreditCard, Layers, ActivitySquare
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    { name: 'Page Builder', icon: <FileText size={20} />, path: '/super-admin/pages' },
    { name: 'Users & Admins', icon: <Users size={20} />, path: '/super-admin/admins' },
    { name: 'API Integrations', icon: <Database size={20} />, path: '/super-admin/integrations' },
    { name: 'API Usage & Limits', icon: <BarChart2 size={20} />, path: '/super-admin/analytics' },
    { name: 'Plan Management', icon: <CreditCard size={20} />, path: '/super-admin/plans' },
    { name: 'Activity Logs', icon: <ActivitySquare size={20} />, path: '/super-admin/logs' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/super-admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      {/* Sidebar for desktop */}
      <div className="hidden lg:flex flex-col fixed inset-y-0 left-0 w-64 bg-white border-r shadow-sm">
        <div className="flex items-center gap-2 p-6 border-b">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-700 flex items-center justify-center">
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

      {/* Mobile header and sidebar */}
      <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" 
           style={{ display: isMobileMenuOpen ? 'block' : 'none' }}
           onClick={() => setIsMobileMenuOpen(false)}>
      </div>
      
      <div className={`lg:hidden fixed inset-y-0 left-0 w-64 bg-white z-50 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-700 flex items-center justify-center">
              <span className="text-white font-bold font-inter">S</span>
            </div>
            <span className="text-xl font-semibold font-inter">Super Admin</span>
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

      {/* Main Content */}
      <div className="flex flex-col lg:ml-64">
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

        {/* Main content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SuperAdminLayout;
