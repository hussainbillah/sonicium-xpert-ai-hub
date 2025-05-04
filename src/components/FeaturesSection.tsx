
import React from 'react';
import { FileText, LayoutDashboard, Calendar, Search, BarChart, Users, FileSearch } from "lucide-react";

const features = [
  {
    icon: <FileText size={24} className="text-sonicium-600" />,
    title: "Ad Copy Generator",
    description: "Create compelling ad copy for all platforms with AI-powered suggestions tailored to your brand voice."
  },
  {
    icon: <LayoutDashboard size={24} className="text-sonicium-600" />,
    title: "Campaign Builder & Budget Optimizer",
    description: "Build cross-platform campaigns and optimize budgets with AI recommendations based on performance."
  },
  {
    icon: <Calendar size={24} className="text-sonicium-600" />,
    title: "Social Media Scheduler",
    description: "Plan, schedule, and automate posts across all your social media channels from one dashboard."
  },
  {
    icon: <Search size={24} className="text-sonicium-600" />,
    title: "SEO & Backlink Audits",
    description: "Analyze your SEO performance and backlink profile to identify opportunities for improvement."
  },
  {
    icon: <BarChart size={24} className="text-sonicium-600" />,
    title: "GA4 Analytics Integration",
    description: "Connect your Google Analytics 4 to visualize and interpret data with actionable insights."
  },
  {
    icon: <Users size={24} className="text-sonicium-600" />,
    title: "Competitor Analysis",
    description: "Monitor competitors' strategies and gain insights to stay ahead in your marketing efforts."
  },
  {
    icon: <FileSearch size={24} className="text-sonicium-600" />,
    title: "Keyword Research",
    description: "Discover high-value keywords that drive traffic and conversions for your content strategy."
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        <h2 className="section-title text-center">Powerful Features</h2>
        <p className="section-subtitle text-center">
          Everything you need to create, manage, and optimize your marketing campaigns in one platform
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300 opacity-0 animate-fade-in"
              style={{ animationDelay: `${0.1 * index}s`, animationFillMode: 'forwards' }}
            >
              <div className="w-12 h-12 rounded-full bg-sonicium-100 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
