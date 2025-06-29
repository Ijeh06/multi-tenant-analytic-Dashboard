import { Tenant } from '@/types';

// Mock tenant data - in production, this would come from your database
export const mockTenants: Tenant[] = [
  {
    id: 'acme',
    name: 'Acme Corporation',
    slug: 'acme',
    theme: {
      primaryColor: '#3B82F6',
      secondaryColor: '#10B981',
    },
    settings: {
      allowedRoles: ['admin', 'manager', 'viewer'],
      features: ['analytics', 'user-management', 'real-time'],
      maxUsers: 100
    }
  },
  {
    id: 'globex',
    name: 'Globex Corporation',
    slug: 'globex',
    theme: {
      primaryColor: '#7C3AED',
      secondaryColor: '#F59E0B',
    },
    settings: {
      allowedRoles: ['admin', 'manager', 'viewer'],
      features: ['analytics', 'user-management'],
      maxUsers: 50
    }
  }
];

export function getTenant(slug: string): Tenant | null {
  return mockTenants.find(tenant => tenant.slug === slug) || null;
}

export function validateTenant(slug: string): boolean {
  return mockTenants.some(tenant => tenant.slug === slug);
}

export function getTenantTheme(slug: string) {
  const tenant = getTenant(slug);
  return tenant?.theme || {
    primaryColor: '#3B82F6',
    secondaryColor: '#10B981',
  };
}