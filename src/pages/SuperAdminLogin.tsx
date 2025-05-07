
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff, Lock, Mail, User, ArrowRight } from "lucide-react";

const SuperAdminLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Default credentials
  const defaultEmail = "wnnbdonline@gmail.com";
  const defaultPassword = "Q121412Q@#%";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate authentication delay
    setTimeout(() => {
      if (email === defaultEmail && password === defaultPassword) {
        // Store admin session in localStorage
        localStorage.setItem("superAdminLoggedIn", "true");
        localStorage.setItem("superAdminEmail", email);
        
        toast({
          title: "Login successful",
          description: "Welcome to the Super Admin dashboard",
        });
        
        navigate("/super-admin/dashboard");
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
      }
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    // Check if admin is already logged in
    const isLoggedIn = localStorage.getItem("superAdminLoggedIn") === "true";
    if (isLoggedIn) {
      navigate("/super-admin/dashboard");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <div className="flex justify-center mb-6">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-700 flex items-center justify-center">
            <span className="text-white font-bold text-2xl">S</span>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2 font-inter">Super Admin Panel</h1>
        <p className="text-center text-gray-500 mb-8 font-poppins">Enter your credentials to access admin controls</p>
        
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="font-poppins">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input 
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 rounded-xl py-6 border-gray-200 font-poppins"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="font-poppins">Password</Label>
              <Button variant="link" className="p-0 h-auto text-sm text-purple-600 font-poppins">
                Forgot password?
              </Button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input 
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-10 pr-10 rounded-xl py-6 border-gray-200 font-poppins"
              />
              <button 
                type="button"
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <Button 
            type="submit" 
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 rounded-xl font-medium shadow-md flex items-center justify-center font-poppins"
            disabled={loading}
          >
            {loading ? (
              "Logging in..."
            ) : (
              <>
                Log in <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-gray-100">
          <Button 
            variant="outline" 
            className="w-full rounded-xl py-6 border-gray-200 flex items-center justify-center font-poppins"
            onClick={() => navigate("/")}
          >
            <User className="mr-2 h-5 w-5" /> Add New Super Admin
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminLogin;
