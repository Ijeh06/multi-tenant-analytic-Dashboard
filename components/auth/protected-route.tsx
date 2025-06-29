'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useTenant } from '@/contexts/tenant-context';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'manager' | 'viewer';
  requiredPermission?: {
    resource: string;
    action: string;
  };
}

export function ProtectedRoute({ 
  children, 
  requiredRole, 
  requiredPermission 
}: ProtectedRouteProps) {
  const { user, tenant, loading } = useTenant();
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (loading) return;

    // Check if user is authenticated
    if (!user || !tenant) {
      // Extract tenant slug from pathname
      const tenantSlug = pathname.split('/')[1];
      router.replace(`/${tenantSlug}/signin`);
      return;
    }

    // Check role-based access
    if (requiredRole && user.role !== requiredRole) {
      // Redirect based on user's actual role
      const tenantSlug = pathname.split('/')[1];
      router.replace(`/${tenantSlug}/dashboard`);
      return;
    }

    // Check permission-based access
    if (requiredPermission) {
      const hasPermission = user.permissions.some(
        permission => 
          permission.resource === requiredPermission.resource && 
          permission.actions.includes(requiredPermission.action)
      );

      if (!hasPermission) {
        const tenantSlug = pathname.split('/')[1];
        router.replace(`/${tenantSlug}/dashboard`);
        return;
      }
    }

    setIsChecking(false);
  }, [user, tenant, loading, router, pathname, requiredRole, requiredPermission]);

  // Show loading state while checking authentication
  if (loading || isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying access...</p>
        </div>
      </div>
    );
  }

  // Show unauthorized message if user doesn't have access
  if (!user || !tenant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-4">You need to sign in to access this page.</p>
          <button
            onClick={() => {
              const tenantSlug = pathname.split('/')[1];
              router.push(`/${tenantSlug}/signin`);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

// Higher-order component for page-level protection
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  options?: {
    requiredRole?: 'admin' | 'manager' | 'viewer';
    requiredPermission?: {
      resource: string;
      action: string;
    };
  }
) {
  return function AuthenticatedComponent(props: P) {
    return (
      <ProtectedRoute 
        requiredRole={options?.requiredRole}
        requiredPermission={options?.requiredPermission}
      >
        <Component {...props} />
      </ProtectedRoute>
    );
  };
}