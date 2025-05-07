
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import SuperAdminSidebar from "./SuperAdminSidebar";
import SuperAdminHeader from "./SuperAdminHeader";

interface SuperAdminLayoutProps {
  children: React.ReactNode;
  currentPage: string;
}

const SuperAdminLayout: React.FC<SuperAdminLayoutProps> = ({ children, currentPage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [adminEmail, setAdminEmail] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is logged in
    const isLoggedIn = localStorage.getItem("superAdminLoggedIn") === "true";
    const email = localStorage.getItem("superAdminEmail");
    
    if (!isLoggedIn) {
      navigate("/super-admin/login");
    } else if (email) {
      setAdminEmail(email);
    }
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem("superAdminLoggedIn");
    localStorage.removeItem("superAdminEmail");
    navigate("/super-admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      <SuperAdminSidebar 
        currentPage={currentPage}
        adminEmail={adminEmail}
        handleSignOut={handleSignOut}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <SuperAdminHeader 
        currentPage={currentPage}
        adminEmail={adminEmail}
        handleSignOut={handleSignOut}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Main Content */}
      <div className="flex flex-col lg:ml-64">
        {/* Main content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SuperAdminLayout;
