import { UserRole, User, Permission } from '@/types';

// Mock authentication - in production, this would integrate with your auth provider
export const mockUsers: Record<string, User> = {
  'admin@acme.com': {
    id: '1',
    name: 'John Admin',
    email: 'admin@acme.com',
    role: 'admin',
    tenantId: 'acme',
    permissions: [
      { resource: 'dashboard', actions: ['read', 'write', 'delete'] },
      { resource: 'users', actions: ['read', 'write', 'delete'] },
      { resource: 'settings', actions: ['read', 'write'] }
    ]
  },
  'manager@acme.com': {
    id: '2',
    name: 'Jane Manager',
    email: 'manager@acme.com',
    role: 'manager',
    tenantId: 'acme',
    departments: ['sales', 'marketing'],
    permissions: [
      { resource: 'dashboard', actions: ['read', 'write'] },
      { resource: 'users', actions: ['read'] }
    ]
  },
  'viewer@acme.com': {
    id: '3',
    name: 'Bob Viewer',
    email: 'viewer@acme.com',
    role: 'viewer',
    tenantId: 'acme',
    permissions: [
      { resource: 'dashboard', actions: ['read'] }
    ]
  }
};

export function getCurrentUser(): User | null {
  // In production, get from session/JWT
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return null;
      }
    }
  }
  return null;
}

export function authenticateUser(email: string, password: string): User | null {
  // Simple demo authentication
  const demoCredentials: Record<string, string> = {
    'admin@acme.com': 'admin123',
    'manager@acme.com': 'manager123',
    'viewer@acme.com': 'viewer123'
  };

  if (demoCredentials[email] === password) {
    return mockUsers[email] || null;
  }

  return null;
}

export function hasPermission(user: User, resource: string, action: string): boolean {
  return user.permissions.some(
    permission => permission.resource === resource && permission.actions.includes(action)
  );
}

export function getRoleHierarchy(): Record<UserRole, number> {
  return {
    viewer: 1,
    manager: 2,
    admin: 3
  };
}

export function hasHigherRole(userRole: UserRole, requiredRole: UserRole): boolean {
  const hierarchy = getRoleHierarchy();
  return hierarchy[userRole] >= hierarchy[requiredRole];
}

export function signOut(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('currentUser');
  }
}