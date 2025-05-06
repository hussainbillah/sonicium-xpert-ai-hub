
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Campaigns from "./pages/Campaigns";
import CampaignForm from "./pages/CampaignForm";
import Analytics from "./pages/Analytics";
import Media from "./pages/Media";
import Profile from "./pages/Profile";
import Subscription from "./pages/Subscription";
import Admin from "./pages/Admin";
import SEODashboard from "./pages/SEODashboard";
import MarketingDashboard from "./pages/MarketingDashboard";
import NotFound from "./pages/NotFound";
// Super Admin imports
import SuperAdminLogin from "./pages/SuperAdminLogin";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import SuperAdminPages from "./pages/SuperAdminPages";
import SuperAdminUsers from "./pages/SuperAdminUsers";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/campaigns/create" element={<CampaignForm />} />
            <Route path="/campaigns/:id" element={<CampaignForm />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/media" element={<Media />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/seo-dashboard" element={<SEODashboard />} />
            <Route path="/marketing-dashboard" element={<MarketingDashboard />} />
            
            {/* Super Admin Routes */}
            <Route path="/super-admin/login" element={<SuperAdminLogin />} />
            <Route path="/super-admin/dashboard" element={<SuperAdminDashboard />} />
            <Route path="/super-admin/pages" element={<SuperAdminPages />} />
            <Route path="/super-admin/admins" element={<SuperAdminUsers />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
