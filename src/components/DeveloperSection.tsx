
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Mail, Phone, Globe, Linkedin, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const DeveloperSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        <h2 className="text-3xl font-bold mb-2 text-center gradient-text">About the Creator</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10 text-center">
          Meet the visionary behind SoniciumXpert
        </p>
        
        <Card className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-3">
              {/* Left side with image and contact */}
              <div className="bg-gradient-to-br from-sonicium-600 to-sonicium-800 p-8 flex flex-col items-center justify-center">
                <Avatar className="w-36 h-36 border-4 border-white mb-6">
                  <AvatarFallback className="text-4xl bg-sonicium-700 text-white">HB</AvatarFallback>
                </Avatar>
                
                <h3 className="text-xl font-bold text-white mb-1">Hussain Billah</h3>
                <p className="text-sonicium-200 mb-6 text-center">Founder & CEO, Sonicium Ltd</p>
                
                <div className="grid grid-cols-2 gap-3 w-full">
                  <Button variant="ghost" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white">
                    <Linkedin size={16} />
                    <span>LinkedIn</span>
                  </Button>
                  
                  <Button variant="ghost" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white">
                    <Github size={16} />
                    <span>GitHub</span>
                  </Button>
                </div>
              </div>
              
              {/* Right side with bio and contact details */}
              <div className="col-span-2 p-8">
                <h4 className="text-xl font-semibold mb-4 text-gray-800">Professional Background</h4>
                
                <p className="text-gray-700 mb-4">
                  SoniciumXpert is a flagship innovation by Hussain Billah, Founder & CEO of <a href="https://sonicium.ltd" className="text-sonicium-600 hover:underline font-medium" target="_blank" rel="noopener noreferrer">Sonicium Ltd</a>, a Bangladesh-based digital innovation company focused on AI, Marketing, and Automation.
                </p>
                
                <p className="text-gray-700 mb-6">
                  Hussain has extensive experience in freelance training, digital strategy, and full-stack marketing systems. His vision is to democratize access to advanced marketing technology through AI-powered solutions.
                </p>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">Contact Information</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
                      <div className="h-10 w-10 rounded-full bg-sonicium-100 flex items-center justify-center">
                        <Mail size={18} className="text-sonicium-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <a href="mailto:ceo@sonicium.ltd" className="text-sonicium-800 font-medium">ceo@sonicium.ltd</a>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
                      <div className="h-10 w-10 rounded-full bg-sonicium-100 flex items-center justify-center">
                        <Phone size={18} className="text-sonicium-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone / WhatsApp</p>
                        <a href="tel:+8801919391942" className="text-sonicium-800 font-medium">+880 1919 391942</a>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
                      <div className="h-10 w-10 rounded-full bg-sonicium-100 flex items-center justify-center">
                        <Globe size={18} className="text-sonicium-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Website</p>
                        <a href="https://sonicium.ltd" target="_blank" rel="noopener noreferrer" className="text-sonicium-800 font-medium">sonicium.ltd</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default DeveloperSection;
