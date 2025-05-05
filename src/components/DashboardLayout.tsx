
import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  FileEdit,
  BarChart3,
  ImageIcon,
  User,
  CreditCard,
  Settings,
  LogOut,
  Users,
  LineChart
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { signOut, user, isAdmin, isSuperAdmin } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { name: 'Campaigns', icon: <FileEdit size={20} />, path: '/campaigns' },
    { name: 'Analytics', icon: <BarChart3 size={20} />, path: '/analytics' },
    { name: 'SEO Dashboard', icon: <LineChart size={20} />, path: '/seo-dashboard' },
    { name: 'Media', icon: <ImageIcon size={20} />, path: '/media' },
    { name: 'Profile', icon: <User size={20} />, path: '/profile' },
    { name: 'Subscription', icon: <CreditCard size={20} />, path: '/subscription' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/settings' },
  ];

  const adminNavItems = [
    { name: 'Admin Panel', icon: <Users size={20} />, path: '/admin' }
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 border-r bg-white">
        <div className="flex items-center gap-2 p-6 border-b">
          <div className="h-8 w-8 rounded-md bg-gradient-to-r from-sonicium-500 to-sonicium-700 flex items-center justify-center">
            <span className="text-white font-bold">S</span>
          </div>
          <span className="text-xl font-semibold">SoniciumXpert</span>
        </div>
        
        <div className="flex-1 overflow-auto py-4 px-3">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className={`w-full justify-start ${
                  window.location.pathname === item.path ? 'bg-gray-100' : ''
                }`}
                onClick={() => navigate(item.path)}
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </Button>
            ))}

            {(isAdmin || isSuperAdmin) && (
              <>
                <div className="pt-4 pb-2">
                  <div className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Admin
                  </div>
                </div>

                {adminNavItems.map((item) => (
                  <Button
                    key={item.name}
                    variant="ghost"
                    className={`w-full justify-start ${
                      window.location.pathname === item.path ? 'bg-gray-100' : ''
                    }`}
                    onClick={() => navigate(item.path)}
                  >
                    {item.icon}
                    <span className="ml-3">{item.name}</span>
                  </Button>
                ))}
              </>
            )}
          </nav>
        </div>
        
        <div className="p-4 border-t">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex-shrink-0" />
              <div className="ml-3">
                <p className="text-sm font-medium">
                  {user?.user_metadata?.full_name || user?.email}
                </p>
                <p className="text-xs text-gray-500 truncate max-w-[160px]">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
          <Button 
            variant="outline"
            className="w-full justify-start" 
            onClick={handleSignOut}
          >
            <LogOut size={18} />
            <span className="ml-2">Sign out</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-md bg-gradient-to-r from-sonicium-500 to-sonicium-700 flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <span className="text-xl font-semibold ml-2">SoniciumXpert</span>
            </div>
            {/* TODO: Mobile menu button */}
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-auto bg-gray-50 px-4 sm:px-6">
          <div className="container mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
