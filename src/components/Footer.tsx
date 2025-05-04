
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Linkedin, Instagram, Mail, MapPin, Phone, Github, Youtube } from "lucide-react";

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
              <a href="#" className="text-gray-300 hover:text-white transition-colors p-2 bg-sonicium-800 rounded-full">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors p-2 bg-sonicium-800 rounded-full">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors p-2 bg-sonicium-800 rounded-full">
                <Linkedin size={18} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors p-2 bg-sonicium-800 rounded-full">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors p-2 bg-sonicium-800 rounded-full">
                <Youtube size={18} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-sonicium-500 rounded-full"></span>Features</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-sonicium-500 rounded-full"></span>Pricing</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-sonicium-500 rounded-full"></span>How It Works</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-sonicium-500 rounded-full"></span>About</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-sonicium-500 rounded-full"></span>Contact</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-sonicium-500 rounded-full"></span>Login</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-sonicium-500 rounded-full"></span>Sign Up</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin size={20} className="mr-3 text-sonicium-400 flex-shrink-0 mt-1" />
                <p className="text-gray-300">Sonicium Ltd, Level 5, House 8, Road 14, Sector 1, Uttara, Dhaka 1230, Bangladesh</p>
              </div>
              <div className="flex items-center">
                <Mail size={20} className="mr-3 text-sonicium-400" />
                <a href="mailto:ceo@sonicium.ltd" className="text-gray-300 hover:text-white transition-colors">ceo@sonicium.ltd</a>
              </div>
              <div className="flex items-center">
                <Phone size={20} className="mr-3 text-sonicium-400" />
                <a href="tel:+8801919391942" className="text-gray-300 hover:text-white transition-colors">+880 1919 391942</a>
              </div>
              <div className="flex items-center">
                <Github size={20} className="mr-3 text-sonicium-400" />
                <a href="https://github.com/sonicium" className="text-gray-300 hover:text-white transition-colors">github.com/sonicium</a>
              </div>
            </div>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Subscribe to Our Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Get the latest news, updates, and marketing tips delivered directly to your inbox
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
            &copy; {new Date().getFullYear()} SoniciumXpert by <a href="https://sonicium.ltd" target="_blank" rel="noopener noreferrer" className="text-sonicium-400 hover:text-white">Sonicium Ltd</a>. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <span className="hidden md:block text-gray-600">•</span>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
            <span className="hidden md:block text-gray-600">•</span>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
            <span className="hidden md:block text-gray-600">•</span>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
