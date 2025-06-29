export interface Tenant {
  id: string;
  name: string;
  slug: string;
  theme: TenantTheme;
  settings: TenantSettings;
}

export interface TenantTheme {
  primaryColor: string;
  secondaryColor: string;
  logo?: string;
  customCSS?: string;
}

export interface TenantSettings {
  allowedRoles: UserRole[];
  features: string[];
  maxUsers: number;
}

export type UserRole = 'admin' | 'manager' | 'viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  tenantId: string;
  departments?: string[];
  permissions: Permission[];
}

export interface Permission {
  resource: string;
  actions: string[];
}

export interface AnalyticsData {
  dailyActiveUsers: {
    value: number;
    change: number;
    trend: number[];
  };
  revenue: {
    value: number;
    change: number;
    trend: number[];
  };
  engagement: {
    value: number;
    change: number;
    trend: number[];
  };
  userGrowth: {
    labels: string[];
    data: number[];
  };
}

export interface DashboardWidget {
  id: string;
  type: 'metric' | 'chart' | 'table' | 'custom';
  title: string;
  data: any;
  permissions: UserRole[];
  refreshInterval?: number;
  lastUpdated: Date;
}