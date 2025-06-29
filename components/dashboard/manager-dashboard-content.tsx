'use client';

import React from 'react';
import { useTenant } from '@/contexts/tenant-context';
import { useAnalytics } from '@/hooks/use-analytics';
import AnalyticsWidget from './analytics-widget';
import { RefreshCw, Users, Target, TrendingUp } from 'lucide-react';

const ManagerDashboardContent: React.FC = () => {
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

  const department = user.departments?.[0] || 'Department';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {department} Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Manager View - {user.name}
          </p>
        </div>
        <button
          onClick={refreshAnalytics}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Data
        </button>
      </div>

      {/* Department Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-2xl">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Team Members</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-2xl">
              <Target className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Goals Achieved</p>
              <p className="text-2xl font-bold text-gray-900">8/10</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-2xl">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Performance</p>
              <p className="text-2xl font-bold text-gray-900">94%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnalyticsWidget
          title={`${department} Active Users`}
          value={Math.floor(analyticsData.dailyActiveUsers.value * 0.3)}
          change={analyticsData.dailyActiveUsers.change || 0}
          data={analyticsData.userGrowth.labels.map((label, index) => ({
            date: label,
            users: Math.floor(analyticsData.userGrowth.data[index] * 0.3)
          }))}
          dataKey="users"
          color="#3B82F6"
          tenantSlug={tenant.slug}
        />

        <AnalyticsWidget
          title="Department Engagement"
          value={analyticsData.engagement.value + 5}
          change={analyticsData.engagement.change || 0}
          data={analyticsData.userGrowth.labels.map((label, index) => ({
            date: label,
            engagement: analyticsData.engagement.value + 5 + (Math.random() * 5 - 2.5)
          }))}
          dataKey="engagement"
          format={(value) => `${value}%`}
          color="#8B5CF6"
          tenantSlug={tenant.slug}
        />
      </div>

      {/* Team Management */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Team Overview</h2>
        <div className="space-y-3">
          {['John Smith', 'Sarah Davis', 'Mike Johnson', 'Lisa Wilson'].map((name, index) => (
            <div key={name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600">{name.charAt(0)}</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{name}</p>
                  <p className="text-xs text-gray-500">{department} Team</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  index % 2 === 0 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {index % 2 === 0 ? 'Active' : 'Busy'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboardContent;