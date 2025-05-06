import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { PenSquare, Search, Plus, UserCog, Trash2, MoreVertical, CheckCircle, XCircle } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import SuperAdminLayout from '@/components/SuperAdminLayout';
import { useToast } from '@/components/ui/use-toast';

type AdminRole = "superadmin" | "admin" | "editor";
type AdminStatus = "active" | "inactive";

interface AdminUser {
  id: string;
  fullName: string;
  email: string;
  role: AdminRole;
  status: AdminStatus;
  lastLogin: string;
}

const SuperAdminUsers = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Form state
  const [formData, setFormData] = useState<Omit<AdminUser, 'id' | 'lastLogin'> & { id?: string, password?: string }>({
    fullName: '',
    email: '',
    role: 'admin',
    status: 'active',
    password: '',
  });

  useEffect(() => {
    // Sample data
    const sampleUsers: AdminUser[] = [
      {
        id: '1',
        fullName: 'Administrator',
        email: 'wnnbdonline@gmail.com',
        role: 'superadmin',
        status: 'active',
        lastLogin: '2025-05-06T08:30:00Z',
      },
      {
        id: '2',
        fullName: 'Jane Smith',
        email: 'jane@example.com',
        role: 'admin',
        status: 'active',
        lastLogin: '2025-05-05T14:45:00Z',
      },
      {
        id: '3',
        fullName: 'Bob Johnson',
        email: 'bob@example.com',
        role: 'editor',
        status: 'inactive',
        lastLogin: '2025-04-28T09:15:00Z',
      }
    ];
    
    setUsers(sampleUsers);
  }, []);

  const filteredUsers = users.filter(user => 
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleRoleChange = (role: AdminRole) => {
    setFormData({
      ...formData,
      role
    });
  };

  const handleStatusChange = (status: AdminStatus) => {
    setFormData({
      ...formData,
      status
    });
  };

  const handleAddUser = () => {
    resetForm();
    setIsEditMode(false);
    setIsDialogOpen(true);
  };

  const handleEditUser = (user: AdminUser) => {
    setFormData({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      status: user.status,
      password: '', // Leave blank for edit mode
    });
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleSaveUser = () => {
    if (!formData.fullName || !formData.email) {
      toast({
        title: "Error",
        description: "Name and email are required fields.",
        variant: "destructive"
      });
      return;
    }

    if (!isEditMode && !formData.password) {
      toast({
        title: "Error",
        description: "Password is required for new users.",
        variant: "destructive"
      });
      return;
    }

    if (isEditMode) {
      // Update existing user
      const updatedUsers = users.map(user => 
        user.id === formData.id 
          ? { 
              ...user, 
              fullName: formData.fullName,
              email: formData.email,
              role: formData.role,
              status: formData.status
            } 
          : user
      );
      
      setUsers(updatedUsers);
      toast({
        title: "Success",
        description: "Admin user updated successfully."
      });
    } else {
      // Add new user
      const newUser: AdminUser = {
        id: `user-${Date.now()}`,
        fullName: formData.fullName,
        email: formData.email,
        role: formData.role,
        status: formData.status,
        lastLogin: 'Never'
      };
      
      setUsers([...users, newUser]);
      toast({
        title: "Success",
        description: "Admin user created successfully."
      });
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      role: 'admin',
      status: 'active',
      password: '',
    });
  };

  const handleDeleteUser = (id: string) => {
    setUserToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteUser = () => {
    if (userToDelete) {
      const updatedUsers = users.filter(user => user.id !== userToDelete);
      setUsers(updatedUsers);
      toast({
        title: "Success",
        description: "Admin user deleted successfully."
      });
      setIsDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  const toggleUserStatus = (id: string, currentStatus: AdminStatus) => {
    const newStatus: AdminStatus = currentStatus === 'active' ? 'inactive' : 'active';
    const updatedUsers = users.map(user => 
      user.id === id ? { ...user, status: newStatus } : user
    );
    
    setUsers(updatedUsers);
    toast({
      title: "Status Changed",
      description: `User is now ${newStatus}.`
    });
  };

  const formatDate = (dateString: string) => {
    if (dateString === 'Never') return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <SuperAdminLayout currentPage="Admin Users">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Admin User Management</h1>
            <p className="text-muted-foreground">Manage users with admin access to your platform</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search users..."
                className="pl-8 w-full sm:w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={handleAddUser}>
              <Plus className="mr-2 h-4 w-4" /> Add Admin
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Administrators</CardTitle>
            <CardDescription>All users with administrative access to the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <UserCog className="h-8 w-8 text-muted-foreground" />
                        <p className="text-muted-foreground">No admin users found</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.fullName}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={user.role === 'superadmin' ? 'destructive' : (user.role === 'admin' ? 'default' : 'outline')}>
                          {user.role === 'superadmin' ? 'Super Admin' : (user.role === 'admin' ? 'Admin' : 'Editor')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.status === 'active' ? 'default' : 'secondary'} className={user.status === 'active' ? 'bg-green-500 text-white hover:bg-green-600' : ''}>
                          {user.status === 'active' ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(user.lastLogin)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditUser(user)}>
                              <PenSquare className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toggleUserStatus(user.id, user.status)}>
                              {user.status === 'active' ? (
                                <>
                                  <XCircle className="mr-2 h-4 w-4" />
                                  Deactivate
                                </>
                              ) : (
                                <>
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Activate
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600" 
                              onClick={() => handleDeleteUser(user.id)}
                              disabled={user.email === 'wnnbdonline@gmail.com'} // Prevent deleting the default super admin
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Add/Edit User Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          if (!open) setIsDialogOpen(false);
        }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{isEditMode ? 'Edit Admin User' : 'Add New Admin User'}</DialogTitle>
              <DialogDescription>
                {isEditMode ? 'Update the details of an existing admin user.' : 'Create a new user with admin privileges.'}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="fullName" className="text-sm font-medium">Full Name</label>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              {!isEditMode && (
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">Password</label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium">Role</label>
                <div className="flex space-x-2">
                  <Button
                    type="button"
                    variant={formData.role === 'editor' ? 'default' : 'outline'}
                    onClick={() => handleRoleChange('editor')}
                    className="flex-1"
                  >
                    Editor
                  </Button>
                  <Button
                    type="button"
                    variant={formData.role === 'admin' ? 'default' : 'outline'}
                    onClick={() => handleRoleChange('admin')}
                    className="flex-1"
                  >
                    Admin
                  </Button>
                  <Button
                    type="button"
                    variant={formData.role === 'superadmin' ? 'default' : 'outline'}
                    onClick={() => handleRoleChange('superadmin')}
                    className="flex-1"
                  >
                    Super Admin
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <div className="flex space-x-2">
                  <Button
                    type="button"
                    variant={formData.status === 'active' ? 'default' : 'outline'}
                    onClick={() => handleStatusChange('active')}
                    className="flex-1"
                  >
                    Active
                  </Button>
                  <Button
                    type="button"
                    variant={formData.status === 'inactive' ? 'default' : 'outline'}
                    onClick={() => handleStatusChange('inactive')}
                    className="flex-1"
                  >
                    Inactive
                  </Button>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveUser}>
                {isEditMode ? 'Save Changes' : 'Create User'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete the user.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDeleteUser}>
                Delete User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </SuperAdminLayout>
  );
};

export default SuperAdminUsers;
