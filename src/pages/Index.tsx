
import React from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorks from "@/components/HowItWorks";
import TestimonialSection from "@/components/TestimonialSection";
import PricingSection from "@/components/PricingSection";
import InsightsSection from "@/components/InsightsSection";
import DeveloperSection from "@/components/DeveloperSection";
import ContactSection from "@/components/ContactSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <HowItWorks />
        <TestimonialSection />
        <PricingSection />
        <InsightsSection />
        <DeveloperSection />
        <ContactSection />
        
        {/* Super Admin Link - typically you'd hide this in a real app */}
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <p className="text-sm text-gray-500 mb-2">Admin Access</p>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/super-admin/login')}
          >
            Super Admin Login
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
