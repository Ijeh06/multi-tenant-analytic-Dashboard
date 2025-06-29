'use client';

import { useTenant } from '@/contexts/tenant-context';
import AdminDashboardContent from './admin-dashboard-content';
import ManagerDashboardContent from './manager-dashboard-content';
import ViewerDashboardContent from './viewer-dashboard-content';

export function DashboardContent() {
  const { user, loading } = useTenant();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-gray-500">Unable to load user data</p>
        </div>
      </div>
    );
  }

  // Render different dashboard content based on user role
  switch (user.role) {
    case 'admin':
      return <AdminDashboardContent />;
    case 'manager':
      return <ManagerDashboardContent />;
    case 'viewer':
      return <ViewerDashboardContent />;
    default:
      return <AdminDashboardContent />;
  }
}