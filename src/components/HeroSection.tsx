
import React from 'react';
import { Button } from "@/components/ui/button";
import { LineChart, BarChart, Search, ArrowUp, LayoutDashboard, MessageSquare } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-50 to-white"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-sonicium-100 rounded-full opacity-70 blur-3xl"></div>
        <div className="absolute top-60 -left-20 w-72 h-72 bg-sonicium-200 rounded-full opacity-70 blur-3xl"></div>
      </div>
      
      {/* Floating dashboard elements */}
      <div className="absolute top-20 right-10 md:top-40 md:right-20 w-20 h-20 bg-white rounded-lg shadow-lg flex items-center justify-center opacity-80 animate-float">
        <LineChart className="text-sonicium-600" size={32} />
      </div>
      
      <div className="absolute bottom-20 left-10 md:bottom-40 md:left-20 w-16 h-16 bg-white rounded-lg shadow-lg flex items-center justify-center opacity-80 animate-float" style={{ animationDelay: '1s' }}>
        <Search className="text-sonicium-600" size={24} />
      </div>
      
      <div className="absolute top-40 left-10 md:left-40 w-14 h-14 bg-white rounded-lg shadow-lg flex items-center justify-center opacity-80 animate-float" style={{ animationDelay: '2s' }}>
        <ArrowUp className="text-green-500" size={20} />
      </div>
      
      <div className="absolute bottom-40 right-10 md:right-60 w-16 h-16 bg-white rounded-lg shadow-lg flex items-center justify-center opacity-80 animate-float" style={{ animationDelay: '1.5s' }}>
        <LayoutDashboard className="text-sonicium-700" size={24} />
      </div>
      
      <div className="absolute top-60 right-30 w-14 h-14 bg-white rounded-lg shadow-lg flex items-center justify-center opacity-80 animate-float" style={{ animationDelay: '2.5s' }}>
        <MessageSquare className="text-sonicium-500" size={20} />
      </div>
      
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            Supercharge Your Marketing <span className="gradient-text">with AI-Powered Tools</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto opacity-0 animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            Create, analyze, optimize – All in one place with SoniciumXpert.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 opacity-0 animate-fade-in" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            <Button size="lg" className="gradient-bg hover:bg-sonicium-800 text-white font-medium px-8 py-6">
              Start Free Trial
            </Button>
            <Button variant="outline" size="lg" className="border-sonicium-600 text-sonicium-600 hover:bg-sonicium-50 font-medium px-8 py-6">
              Book a Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
