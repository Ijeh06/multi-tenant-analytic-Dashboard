'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Tenant, User } from '@/types';
import { getTenant } from '@/lib/tenants';
import { getCurrentUser } from '@/lib/auth';

interface TenantContextType {
  tenant: Tenant | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}

const TenantContext = createContext<TenantContextType>({
  tenant: null,
  user: null,
  loading: true,
  error: null,
});

export function TenantProvider({ 
  children, 
  tenantSlug 
}: { 
  children: React.ReactNode;
  tenantSlug: string;
}) {
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTenantData() {
      try {
        setLoading(true);
        setError(null);

        // Load tenant
        const tenantData = getTenant(tenantSlug);
        if (!tenantData) {
          setError('Tenant not found');
          return;
        }

        // Load user
        const userData = getCurrentUser();
        
        // Allow access if user exists and belongs to tenant, or if no user (for signin page)
        if (userData && userData.tenantId !== tenantData.id) {
          setError('Access denied');
          return;
        }

        setTenant(tenantData);
        setUser(userData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    loadTenantData();

    // Listen for auth changes
    const handleStorageChange = () => {
      const userData = getCurrentUser();
      setUser(userData);
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for same-tab auth changes
    window.addEventListener('authChange', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authChange', handleStorageChange);
    };
  }, [tenantSlug]);

  return (
    <TenantContext.Provider value={{ tenant, user, loading, error }}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
}