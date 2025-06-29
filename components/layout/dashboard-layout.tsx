'use client';

import { cn } from '@/lib/utils';
import { useTenant } from '@/contexts/tenant-context';
import { DashboardHeader } from './dashboard-header';
import { DashboardSidebar } from './dashboard-sidebar';
import { useState } from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function DashboardLayout({ children, className }: DashboardLayoutProps) {
  const { tenant, loading } = useTenant();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader 
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        tenant={tenant}
      />
      
      <div className="flex">
        <DashboardSidebar 
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          tenant={tenant}
        />
        
        <main className={cn(
          "flex-1 p-6 lg:pl-72 transition-all duration-200",
          className
        )}>
          <div 
            className="mx-auto"
            style={{
              '--tenant-primary': tenant?.theme.primaryColor || '#3B82F6',
              '--tenant-secondary': tenant?.theme.secondaryColor || '#10B981',
            } as React.CSSProperties}
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}