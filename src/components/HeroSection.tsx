
import React from 'react';
import { Button } from "@/components/ui/button";
import { LineChart, BarChart, Search, ArrowUp, LayoutDashboard, MessageSquare, Sparkles, BarChart2 } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
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
      
      <div className="absolute bottom-24 left-40 w-16 h-16 bg-white rounded-lg shadow-lg flex items-center justify-center opacity-80 animate-float" style={{ animationDelay: '3s' }}>
        <Sparkles className="text-yellow-500" size={24} />
      </div>
      
      <div className="absolute top-32 right-48 w-14 h-14 bg-white rounded-lg shadow-lg flex items-center justify-center opacity-80 animate-float" style={{ animationDelay: '3.5s' }}>
        <BarChart2 className="text-sonicium-600" size={20} />
      </div>
      
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-3 px-4 py-2 bg-sonicium-100 rounded-full">
            <span className="text-sonicium-700 font-medium text-sm">AI-Powered Marketing Platform</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            Supercharge Your <span className="relative">
              <span className="gradient-text">Marketing Strategy</span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 10C50.9999 4.99999 299 -6.00002 298 7.49999" stroke="#0EA5E9" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto opacity-0 animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            Create, analyze, and optimize your digital marketing campaigns with our AI-powered platform. Increase ROI and save time with SoniciumXpert.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 opacity-0 animate-fade-in" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            <Button size="lg" className="gradient-bg hover:bg-sonicium-800 text-white font-medium px-8 py-6 shadow-lg">
              Start Free Trial
            </Button>
            <Button variant="outline" size="lg" className="border-sonicium-600 text-sonicium-600 hover:bg-sonicium-50 font-medium px-8 py-6">
              Book a Demo
            </Button>
          </div>
          
          <div className="mt-12 opacity-0 animate-fade-in" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
            <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
              <span>Trusted by 500+ companies worldwide</span>
              <span className="h-1 w-1 bg-gray-300 rounded-full"></span>
              <span>No credit card required</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
