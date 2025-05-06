
import React, { useState } from 'react';
import SuperAdminLayout from '@/components/SuperAdminLayout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Pencil, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface AdminUser {
  id: string;
  fullName: string;
  email: string;
  role: 'superadmin' | 'admin' | 'editor';
  status: 'active' | 'inactive';
  lastLogin: string;
}

const SuperAdminUsers: React.FC = () => {
  const { toast } = useToast();
  
  // Sample data for admin users
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([
    {
      id: '1',
      fullName: 'Jane Smith',
      email: 'wnnbdonline@gmail.com',
      role: 'superadmin',
      status: 'active',
      lastLogin: '2025-05-05',
    },
    {
      id: '2',
      fullName: 'John Doe',
      email: 'john@example.com',
      role: 'admin',
      status: 'active',
      lastLogin: '2025-05-03',
    },
    {
      id: '3',
      fullName: 'Sarah Williams',
      email: 'sarah@example.com',
      role: 'editor',
      status: 'inactive',
      lastLogin: '2025-04-28',
    },
  ]);

  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    id: '',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'admin',
    status: true,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleChange = (value: string) => {
    setFormData({ ...formData, role: value });
  };

  const handleStatusChange = (checked: boolean) => {
    setFormData({ ...formData, status: checked });
  };

  const handleCreateUser = () => {
    // Password validation
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }
    
    if (formData.password.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }
    
    // Email validation
    if (!formData.email.includes('@')) {
      toast({
        title: "Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    const newUser: AdminUser = {
      id: Date.now().toString(),
      fullName: formData.fullName,
      email: formData.email,
      role: formData.role as 'superadmin' | 'admin' | 'editor',
      status: formData.status ? 'active' : 'inactive',
      lastLogin: 'Never',
    };
    
    setAdminUsers([...adminUsers, newUser]);
    
    toast({
      title: "Success",
      description: "Admin user created successfully.",
    });
    
    // Reset form
    setFormData({
      id: '',
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'admin',
      status: true,
    });
    
    setIsCreateDialogOpen(false);
  };

  const handleUpdateUser = () => {
    // Email validation
    if (!formData.email.includes('@')) {
      toast({
        title: "Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    // Password validation if provided
    if (formData.password && formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }
    
    if (formData.password && formData.password.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }
    
    const updatedUsers = adminUsers.map(user => {
      if (user.id === formData.id) {
        return {
          ...user,
          fullName: formData.fullName,
          email: formData.email,
          role: formData.role as 'superadmin' | 'admin' | 'editor',
          status: formData.status ? 'active' : 'inactive',
        };
      }
      return user;
    });
    
    setAdminUsers(updatedUsers);
    
    toast({
      title: "Success",
      description: "Admin user updated successfully.",
    });
    
    // Reset form
    setFormData({
      id: '',
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'admin',
      status: true,
    });
    
    setIsEditDialogOpen(false);
  };

  const handleDeleteUser = () => {
    if (currentUser) {
      // Prevent deleting default super admin
      if (currentUser.email === 'wnnbdonline@gmail.com') {
        toast({
          title: "Error",
          description: "Cannot delete the default super admin account.",
          variant: "destructive",
        });
        setIsDeleteDialogOpen(false);
        return;
      }
      
      const filteredUsers = adminUsers.filter(user => user.id !== currentUser.id);
      setAdminUsers(filteredUsers);
      
      toast({
        title: "Success",
        description: "Admin user deleted successfully.",
      });
      
      setCurrentUser(null);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleEditClick = (user: AdminUser) => {
    setFormData({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      password: '',
      confirmPassword: '',
      role: user.role,
      status: user.status === 'active',
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (user: AdminUser) => {
    setCurrentUser(user);
    setIsDeleteDialogOpen(true);
  };

  const toggleUserStatus = (id: string) => {
    // Prevent toggling default super admin
    const user = adminUsers.find(user => user.id === id);
    if (user && user.email === 'wnnbdonline@gmail.com') {
      toast({
        title: "Error",
        description: "Cannot modify the default super admin account.",
        variant: "destructive",
      });
      return;
    }
    
    const updatedUsers = adminUsers.map(user => {
      if (user.id === id) {
        return {
          ...user,
          status: user.status === 'active' ? 'inactive' : 'active',
        };
      }
      return user;
    });
    
    setAdminUsers(updatedUsers);
  };

  return (
    <SuperAdminLayout currentPage="Admin Users">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Admin User Management</h2>
            <p className="text-sm text-gray-500">Manage admin users and their permissions</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus size={18} className="mr-2" />
                Add Admin
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Admin User</DialogTitle>
                <DialogDescription>
                  Fill in the details to create a new admin user.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input 
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input 
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="••••••••"
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
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input 
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select 
                      value={formData.role} 
                      onValueChange={handleRoleChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="superadmin">Super Admin</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="editor">Editor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="status">Active</Label>
                    <Switch 
                      id="status"
                      checked={formData.status}
                      onCheckedChange={handleStatusChange}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleCreateUser}>Create User</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">Role</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Last Login</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {adminUsers.map((user) => (
                    <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">{user.fullName}</td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">
                        <Badge className={
                          user.role === 'superadmin' ? 'bg-purple-600' : 
                          user.role === 'admin' ? 'bg-blue-600' : 'bg-green-600'
                        }>
                          {user.role === 'superadmin' ? 'Super Admin' : 
                           user.role === 'admin' ? 'Admin' : 'Editor'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Switch 
                          checked={user.status === 'active'}
                          onCheckedChange={() => toggleUserStatus(user.id)}
                          disabled={user.email === 'wnnbdonline@gmail.com'}
                        />
                      </td>
                      <td className="px-6 py-4">{user.lastLogin}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleEditClick(user)}
                            disabled={user.email === 'wnnbdonline@gmail.com'}
                          >
                            <Pencil size={16} />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-500"
                            onClick={() => handleDeleteClick(user)}
                            disabled={user.email === 'wnnbdonline@gmail.com'}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Admin User</DialogTitle>
            <DialogDescription>
              Update admin user information.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-fullName">Full Name</Label>
                <Input 
                  id="edit-fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input 
                  id="edit-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="edit-password">New Password</Label>
                  <span className="text-xs text-gray-500">(leave blank to keep unchanged)</span>
                </div>
                <div className="relative">
                  <Input 
                    id="edit-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
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
              <div className="space-y-2">
                <Label htmlFor="edit-confirmPassword">Confirm New Password</Label>
                <Input 
                  id="edit-confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-role">Role</Label>
                <Select 
                  value={formData.role} 
                  onValueChange={handleRoleChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="superadmin">Super Admin</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="edit-status">Active</Label>
                <Switch 
                  id="edit-status"
                  checked={formData.status}
                  onCheckedChange={handleStatusChange}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateUser}>Update User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Admin User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{currentUser?.fullName}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteUser}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SuperAdminLayout>
  );
};

export default SuperAdminUsers;
