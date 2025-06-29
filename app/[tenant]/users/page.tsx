'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useTenant } from '@/contexts/tenant-context';
import { hasPermission } from '@/lib/auth';
import { Plus, MoreHorizontal, UserPlus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock users for demonstration
const mockUsers = [
  {
    id: '1',
    name: 'John Admin',
    email: 'admin@acme.com',
    role: 'admin',
    department: 'IT',
    lastActive: '2 minutes ago',
    status: 'active'
  },
  {
    id: '2',
    name: 'Jane Manager',
    email: 'manager@acme.com',
    role: 'manager',
    department: 'Sales',
    lastActive: '1 hour ago',
    status: 'active'
  },
  {
    id: '3',
    name: 'Bob Viewer',
    email: 'viewer@acme.com',
    role: 'viewer',
    department: 'Marketing',
    lastActive: '1 day ago',
    status: 'inactive'
  }
];

export default function UsersPage() {
  const { user } = useTenant();
  const canManageUsers = user && hasPermission(user, 'users', 'write');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Users</h1>
            <p className="text-gray-600 mt-2">
              Manage team members and their access permissions.
            </p>
          </div>
          {canManageUsers && (
            <button
              type="button"
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </button>
          )}
        </div>

        <div className="grid gap-4">
          {mockUsers.map((mockUser) => (
            <Card key={mockUser.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>
                        {mockUser.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">{mockUser.name}</h3>
                      <p className="text-gray-600">{mockUser.email}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant={mockUser.role === 'admin' ? 'default' : 'secondary'}>
                          {mockUser.role}
                        </Badge>
                        <span className="text-sm text-gray-500">{mockUser.department}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <div 
                          className={`w-2 h-2 rounded-full ${
                            mockUser.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                          }`}
                        />
                        <span className="text-sm text-gray-600 capitalize">
                          {mockUser.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        Last active: {mockUser.lastActive}
                      </div>
                    </div>
                    
                    {canManageUsers && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit User</DropdownMenuItem>
                          <DropdownMenuItem>Change Role</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            Deactivate
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {!canManageUsers && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800">
              You have read-only access to user information. Contact an administrator to manage users.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}