'use client';

import React from 'react';
import { useTenant } from '@/contexts/tenant-context';
import { useAnalytics } from '@/hooks/use-analytics';
import AnalyticsWidget from './analytics-widget';
import { RefreshCw } from 'lucide-react';

const AdminDashboardContent: React.FC = () => {
  const { tenant, user } = useTenant();
  const { data: analyticsData, loading, refetch: refreshAnalytics } = useAnalytics(tenant?.id || '');

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!tenant || !user || !analyticsData) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Unable to load dashboard data</p>
        </div>
      </div>
    );
  }

  const hasFullAccess = user.role === 'admin';
  const hasManagerAccess = user.role === 'manager';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Welcome back, {user.name}
            {user.departments && user.departments.length > 0 && ` • ${user.departments[0]} Department`}
          </p>
        </div>
      </div>

      {/* Role-based access notice */}
      {!hasFullAccess && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-amber-800 text-sm">
            {hasManagerAccess 
              ? `You're viewing ${user.departments?.[0] || 'department'} data with manager permissions.`
              : 'You have viewer-level access to assigned dashboards only.'
            }
          </p>
        </div>
      )}

      {/* Analytics Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Daily Active Users */}
        {(hasFullAccess || hasManagerAccess) && (
          <AnalyticsWidget
            title="Daily Active Users"
            value={analyticsData.dailyActiveUsers.value}
            change={analyticsData.dailyActiveUsers.change || 0}
            data={analyticsData.userGrowth.labels.map((label, index) => ({
              date: label,
              users: analyticsData.userGrowth.data[index]
            }))}
            dataKey="users"
            color="#3B82F6"
            metricType="users"
            tenantSlug={tenant.slug}
          />
        )}

        {/* Revenue */}
        {hasFullAccess && (
          <AnalyticsWidget
            title="Revenue"
            value={analyticsData.revenue.value}
            change={analyticsData.revenue.change || 0}
            data={analyticsData.userGrowth.labels.map((label, index) => ({
              date: label,
              revenue: analyticsData.revenue.value + (Math.random() * 1000 - 500)
            }))}
            dataKey="revenue"
            format={(value) => `$${value.toLocaleString()}`}
            color="#10B981"
            metricType="revenue"
            tenantSlug={tenant.slug}
          />
        )}

        {/* User Engagement */}
        <AnalyticsWidget
          title="User Engagement"
          value={analyticsData.engagement.value}
          change={analyticsData.engagement.change || 0}
          data={analyticsData.userGrowth.labels.map((label, index) => ({
            date: label,
            engagement: analyticsData.engagement.value + (Math.random() * 10 - 5)
          }))}
          dataKey="engagement"
          format={(value) => `${value}%`}
          color="#8B5CF6"
          metricType="engagement"
          tenantSlug={tenant.slug}
        />
      </div>

      {/* Performance Metrics */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Data Last Updated</p>
            <p className="font-medium">{new Date().toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-500">Tenant</p>
            <p className="font-medium">{tenant.name}</p>
          </div>
          <div>
            <p className="text-gray-500">Access Level</p>
            <p className="font-medium capitalize">{user.role}</p>
          </div>
        </div>
      </div>

      {/* Refresh Button */}
      <div className="flex justify-end">
        <button
          onClick={refreshAnalytics}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Data
        </button>
      </div>
    </div>
  );
};

export default AdminDashboardContent;