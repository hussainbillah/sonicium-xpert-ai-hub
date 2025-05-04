
import React from 'react';
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";

const plans = [
  {
    name: "Free",
    description: "Perfect for exploring the platform",
    price: "$0",
    period: "forever",
    features: [
      "1 marketing channel",
      "5 campaigns per month",
      "Basic analytics",
      "Email support"
    ],
    buttonText: "Get Started",
    buttonVariant: "outline",
    popular: false
  },
  {
    name: "Pro",
    description: "For growing businesses",
    price: "$49",
    period: "per month",
    features: [
      "5 marketing channels",
      "Unlimited campaigns",
      "Advanced analytics",
      "AI content generation",
      "Priority support",
      "Campaign automation"
    ],
    buttonText: "Start 14-day Trial",
    buttonVariant: "default",
    popular: true
  },
  {
    name: "Enterprise",
    description: "For large organizations",
    price: "Custom",
    period: "tailored plan",
    features: [
      "Unlimited marketing channels",
      "Advanced API access",
      "Custom integrations",
      "Dedicated account manager",
      "Team collaboration tools",
      "White-labeled reports"
    ],
    buttonText: "Contact Sales",
    buttonVariant: "outline",
    popular: false
  }
];

const PricingSection = () => {
  return (
    <section className="py-20">
      <div className="container-custom">
        <h2 className="section-title text-center">Pricing Plans</h2>
        <p className="section-subtitle text-center">
          Choose the perfect plan for your marketing needs
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`rounded-xl overflow-hidden border ${
                plan.popular ? 'border-sonicium-500 shadow-xl shadow-sonicium-100' : 'border-gray-200 shadow-md'
              } bg-white flex flex-col opacity-0 animate-fade-in`}
              style={{ animationDelay: `${0.2 * index}s`, animationFillMode: 'forwards' }}
            >
              {plan.popular && (
                <div className="bg-sonicium-500 text-white text-center py-2 text-sm font-medium">
                  Most Popular
                </div>
              )}
              <div className="p-8 flex-grow">
                <h3 className="text-2xl font-bold mb-2 text-gray-800">{plan.name}</h3>
                <p className="text-gray-500 mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-500 ml-2">{plan.period}</span>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckIcon className="text-green-500 flex-shrink-0" size={18} />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="p-8 pt-0">
                <Button 
                  variant={plan.buttonVariant as "outline" | "default"}
                  className={`w-full ${plan.popular ? 'bg-sonicium-600 hover:bg-sonicium-700 text-white' : ''}`}
                >
                  {plan.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
