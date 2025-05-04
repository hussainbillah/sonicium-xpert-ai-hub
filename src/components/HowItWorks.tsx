
import React from 'react';
import { Link2, Wand2, Rocket } from 'lucide-react';

const steps = [
  {
    icon: <Link2 size={32} className="text-white" />,
    title: "Connect",
    description: "Link your advertising accounts and analytics platforms to SoniciumXpert in just a few clicks.",
    color: "bg-sonicium-600"
  },
  {
    icon: <Wand2 size={32} className="text-white" />,
    title: "Generate",
    description: "Use AI to create optimized ad copy, content, and campaigns tailored to your specific goals.",
    color: "bg-sonicium-700"
  },
  {
    icon: <Rocket size={32} className="text-white" />,
    title: "Launch",
    description: "Deploy your campaigns across multiple platforms and monitor real-time performance.",
    color: "bg-sonicium-800"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <h2 className="section-title text-center">How It Works</h2>
        <p className="section-subtitle text-center">
          SoniciumXpert streamlines your marketing workflow in three simple steps
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="flex flex-col items-center text-center opacity-0 animate-fade-in"
              style={{ animationDelay: `${0.2 * index}s`, animationFillMode: 'forwards' }}
            >
              <div className={`w-20 h-20 ${step.color} rounded-full flex items-center justify-center mb-6 shadow-lg`}>
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">{step.title}</h3>
              <p className="text-gray-600 max-w-xs">{step.description}</p>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute translate-x-[150%] translate-y-10">
                  <svg width="64" height="24" viewBox="0 0 64 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M63.0607 13.0607C63.6464 12.4749 63.6464 11.5251 63.0607 10.9393L53.5147 1.3934C52.9289 0.807612 51.9792 0.807612 51.3934 1.3934C50.8076 1.97918 50.8076 2.92893 51.3934 3.51472L59.8787 12L51.3934 20.4853C50.8076 21.0711 50.8076 22.0208 51.3934 22.6066C51.9792 23.1924 52.9289 23.1924 53.5147 22.6066L63.0607 13.0607ZM0 13.5H62V10.5H0V13.5Z" fill="#CBD5E1"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
