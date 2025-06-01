import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorks from "@/components/HowItWorks";
import TestimonialSection from "@/components/TestimonialSection";
import PricingSection from "@/components/PricingSection";
import InsightsSection from "@/components/InsightsSection";
import DeveloperSection from "@/components/DeveloperSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <TestimonialSection />
      <PricingSection />
      <InsightsSection />
      <DeveloperSection />
      <ContactSection />
      
      {/* Quick Access to Dashboards */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Our Dashboards</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience different dashboard interfaces designed for various use cases
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <a href="/dashboard" className="group block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                <span className="text-blue-600 text-xl">📊</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Main Dashboard</h3>
              <p className="text-sm text-gray-600">Core analytics and campaign management</p>
            </a>
            
            <a href="/veraion-dashboard" className="group block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                <span className="text-purple-600 text-xl">🚀</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Veraion 2.0</h3>
              <p className="text-sm text-gray-600">Complete digital marketing suite</p>
            </a>
            
            <a href="/seo-dashboard" className="group block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                <span className="text-green-600 text-xl">🔍</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">SEO Dashboard</h3>
              <p className="text-sm text-gray-600">Search engine optimization tools</p>
            </a>
            
            <a href="/marketing-dashboard" className="group block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                <span className="text-orange-600 text-xl">📈</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Marketing Hub</h3>
              <p className="text-sm text-gray-600">Comprehensive marketing analytics</p>
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
