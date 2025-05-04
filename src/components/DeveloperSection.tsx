
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Mail, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DeveloperSection = () => {
  return (
    <section className="py-20">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-center gradient-text">About the Creator</h2>
            
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-shrink-0">
                <Avatar className="w-32 h-32 border-4 border-sonicium-100">
                  <AvatarFallback className="text-3xl bg-sonicium-600 text-white">HB</AvatarFallback>
                </Avatar>
              </div>
              
              <div className="flex-1">
                <p className="text-gray-700 mb-4">
                  SoniciumXpert is a flagship innovation by Hussain Billah, Founder & CEO of <a href="https://sonicium.ltd" className="text-sonicium-600 hover:underline" target="_blank" rel="noopener noreferrer">Sonicium Ltd</a>, a Bangladesh-based digital innovation company focused on AI, Marketing, and Automation. Hussain has extensive experience in freelance training, digital strategy, and full-stack marketing systems.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Mail size={16} />
                    <a href="mailto:ceo@sonicium.ltd">ceo@sonicium.ltd</a>
                  </Button>
                  
                  <Button variant="outline" className="flex items-center gap-2">
                    <MessageSquare size={16} />
                    <span>+8801919391942</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeveloperSection;
