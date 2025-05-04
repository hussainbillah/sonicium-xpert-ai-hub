
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from '@/components/ui/card';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

const ContactSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <h2 className="section-title text-center">Contact Us</h2>
        <p className="section-subtitle text-center">
          Have questions or need assistance? We're here to help!
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          {/* Contact Form */}
          <Card className="bg-white shadow-md">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-6 text-gray-800">Send us a Message</h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <Input id="name" placeholder="John Doe" className="w-full" />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <Input id="email" type="email" placeholder="john@example.com" className="w-full" />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <Input id="subject" placeholder="How can we help you?" className="w-full" />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Message
                  </label>
                  <Textarea id="message" placeholder="Type your message here..." className="min-h-[150px]" />
                </div>
                
                <Button type="submit" className="w-full md:w-auto gradient-bg">
                  <Send size={18} className="mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {/* Contact Information */}
          <div className="flex flex-col gap-6">
            <Card className="bg-gradient-to-r from-sonicium-600 to-sonicium-800 text-white shadow-md">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center mr-4">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Our Office</h4>
                      <address className="not-italic text-sonicium-100">
                        Sonicium Ltd, Level 5, House 8, Road 14<br />
                        Sector 1, Uttara, Dhaka 1230<br />
                        Bangladesh
                      </address>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center mr-4">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Email Us</h4>
                      <a href="mailto:ceo@sonicium.ltd" className="text-sonicium-100 hover:text-white">ceo@sonicium.ltd</a><br />
                      <a href="mailto:support@sonicium.ltd" className="text-sonicium-100 hover:text-white">support@sonicium.ltd</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center mr-4">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Call Us</h4>
                      <a href="tel:+8801919391942" className="text-sonicium-100 hover:text-white">+880 1919 391942</a><br />
                      <p className="text-sm text-sonicium-200 mt-1">Monday-Friday: 9am to 6pm BDT</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-md flex-1">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-6 text-gray-800">Our Business Hours</h3>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-medium">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-medium">Closed</span>
                  </div>
                  
                  <div className="pt-4 mt-4 border-t border-gray-100">
                    <p className="text-gray-600">
                      Need urgent assistance? Contact us via WhatsApp for 24/7 support.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
