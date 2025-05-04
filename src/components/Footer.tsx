
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Linkedin, Instagram, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-sonicium-900 text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="h-10 w-10 rounded-md bg-white flex items-center justify-center">
                <span className="text-sonicium-800 font-bold text-xl">S</span>
              </div>
              <span className="text-xl font-bold">SoniciumXpert</span>
            </div>
            <p className="text-gray-300 mb-6">
              The all-in-one AI-powered marketing platform for businesses looking to scale their digital presence and campaigns.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Login</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Sign Up</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin size={20} className="mr-3 text-gray-300 flex-shrink-0 mt-1" />
                <p className="text-gray-300">Sonicium Ltd, Dhaka, Bangladesh</p>
              </div>
              <div className="flex items-center">
                <Mail size={20} className="mr-3 text-gray-300" />
                <a href="mailto:ceo@sonicium.ltd" className="text-gray-300 hover:text-white transition-colors">ceo@sonicium.ltd</a>
              </div>
              <div className="flex items-center">
                <Phone size={20} className="mr-3 text-gray-300" />
                <p className="text-gray-300">+8801919391942</p>
              </div>
            </div>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Subscribe to Our Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Get the latest news and updates about SoniciumXpert
            </p>
            <div className="flex flex-col space-y-3">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="bg-sonicium-800 border-sonicium-700 text-white placeholder:text-gray-400" 
              />
              <Button className="bg-white text-sonicium-800 hover:bg-gray-200">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        <hr className="border-sonicium-800 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} SoniciumXpert by Sonicium Ltd. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
