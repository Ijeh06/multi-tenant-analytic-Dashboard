'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  Users, 
  Settings, 
  X,
  Home,
  Shield,
  Presentation
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTenant } from '@/contexts/tenant-context';
import { hasPermission } from '@/lib/auth';
import { Tenant } from '@/types';

interface DashboardSidebarProps {
  open: boolean;
  onClose: () => void;
  tenant: Tenant | null;
}

export function DashboardSidebar({ open, onClose, tenant }: DashboardSidebarProps) {
  const pathname = usePathname();
  const { user } = useTenant();

  const navigation = [
    {
      name: 'Dashboard',
      href: `/${tenant?.slug}/dashboard`,
      icon: Home,
      permission: { resource: 'dashboard', action: 'read' }
    },
    {
      name: 'Analytics',
      href: `/${tenant?.slug}/analytics/users`,
      icon: BarChart3,
      permission: { resource: 'dashboard', action: 'read' }
    },
    {
      name: 'Users',
      href: `/${tenant?.slug}/users`,
      icon: Users,
      permission: { resource: 'users', action: 'read' }
    },
    // {
    //   name: 'Demo',
    //   href: `/${tenant?.slug}/demo`,
    //   icon: Presentation,
    //   permission: { resource: 'dashboard', action: 'read' }
    // },
    {
      name: 'Settings',
      href: `/${tenant?.slug}/settings`,
      icon: Settings,
      permission: { resource: 'settings', action: 'read' }
    },
  ];

  const filteredNavigation = navigation.filter(item => {
    if (!user) return false;
    return hasPermission(user, item.permission.resource, item.permission.action);
  });

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 z-50 h-screen w-64 bg-slate-900 border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:z-0",
        open ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between p-6 border-b border-gray-200 lg:hidden">
          <span className="text-lg font-semibold">Menu</span>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="p-6 space-y-2">
          {filteredNavigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => onClose()}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-blue-50 text-blue-700" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
            <Shield className="h-4 w-4 text-gray-500" />
            <div className="text-xs text-gray-600">
              <div className="font-medium">Role: {user?.role}</div>
              <div>Tenant: {tenant?.name}</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}