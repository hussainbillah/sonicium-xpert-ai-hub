
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl p-8">
        <div className="flex justify-center mb-6">
          <div className="h-12 w-12 rounded-md bg-gradient-to-r from-purple-600 to-indigo-700 flex items-center justify-center">
            <span className="text-white font-bold text-2xl">S</span>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">Super Admin Panel</h1>
        <p className="text-center text-gray-500 mb-6">Enter your credentials to login</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a href="#" className="text-xs text-purple-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Input 
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pr-10"
              />
              <button 
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <Button 
            type="submit" 
            className="w-full bg-purple-600 hover:bg-purple-700"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SuperAdminLogin;
