
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="py-4 border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container-custom flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="h-10 w-10 rounded-md bg-gradient-to-r from-sonicium-500 to-sonicium-700 flex items-center justify-center">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <span className="text-xl font-bold text-sonicium-800">SoniciumXpert</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-sonicium-600 transition-colors font-medium">
            Features
          </Link>
          <Link to="/" className="text-gray-600 hover:text-sonicium-600 transition-colors font-medium">
            Pricing
          </Link>
          <Link to="/" className="text-gray-600 hover:text-sonicium-600 transition-colors font-medium">
            How It Works
          </Link>
          <Button variant="ghost" className="font-medium">Login</Button>
          <Button className="bg-sonicium-600 hover:bg-sonicium-700">Sign Up</Button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="p-2">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden py-4 px-6 bg-white border-b animate-fade-in">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="text-gray-600 hover:text-sonicium-600 transition-colors py-2 font-medium">
              Features
            </Link>
            <Link to="/" className="text-gray-600 hover:text-sonicium-600 transition-colors py-2 font-medium">
              Pricing
            </Link>
            <Link to="/" className="text-gray-600 hover:text-sonicium-600 transition-colors py-2 font-medium">
              How It Works
            </Link>
            <div className="flex flex-col space-y-2 pt-2">
              <Button variant="outline" className="w-full font-medium">Login</Button>
              <Button className="w-full bg-sonicium-600 hover:bg-sonicium-700">Sign Up</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
