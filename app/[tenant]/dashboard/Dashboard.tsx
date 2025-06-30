import React from 'react';
import { useTenant } from '../../contexts/TenantContext';
import AnalyticsWidget from './analytics-widget';
import { RefreshCw } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { currentTenant, currentUser, analyticsData, loading, refreshAnalytics } = useTenant();

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!currentTenant || !currentUser || !analyticsData) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Unable to load dashboard data</p>
        </div>
      </div>
    );
  }

  const hasFullAccess = currentUser.permissions.includes('view_all');
  const hasManagerAccess = currentUser.permissions.includes('view_department');

  return (
    <div className="flex-1 bg-gray-50 p-8 h-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mt-6">
                Analytics Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Welcome back, {currentUser.name}
                {currentUser.department && ` • ${currentUser.department} Department`}
              </p>
            </div>
            {/* <button
              onClick={refreshAnalytics}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-red-700 transition-colors border"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </button> */}
          </div>
        </div>

        {/* Role-based access notice */}
        {!hasFullAccess && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-amber-800 text-sm">
              {hasManagerAccess 
                ? `You're viewing ${currentUser.department} department data with manager permissions.`
                : 'You have viewer-level access to assigned dashboards only.'
              }
            </p>
          </div>
        )}

        {/* Analytics Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
          {/* Daily Active Users */}
          {(hasFullAccess || hasManagerAccess) && (
            <AnalyticsWidget
              title="Daily Active Users"
              value={analyticsData.dailyActiveUsers.current}
              change={analyticsData.dailyActiveUsers.change}
              data={analyticsData.dailyActiveUsers.data}
              dataKey="users"
              color="#3B82F6"
              metricType="users"
            />
          )}

          {/* Revenue */}
          {hasFullAccess && (
            <AnalyticsWidget
              title="Revenue"
              value={analyticsData.revenue.current}
              change={analyticsData.revenue.change}
              data={analyticsData.revenue.data}
              dataKey="revenue"
              format={(value) => `$${value.toLocaleString()}`}
              color="#10B981"
              metricType="revenue"
            />
          )}

          {/* User Engagement */}
          <AnalyticsWidget
            title="User Engagement"
            value={analyticsData.engagement.current}
            change={analyticsData.engagement.change}
            data={analyticsData.engagement.data}
            dataKey="engagement"
            format={(value) => `${value}%`}
            color="#8B5CF6"
            metricType="engagement"
          />
        </div>

        {/* Performance Metrics */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Data Last Updated</p>
              <p className="font-medium">{new Date().toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-500">Tenant</p>
              <p className="font-medium">{currentTenant.name}</p>
            </div>
            <div>
              <p className="text-gray-500">Access Level</p>
              <p className="font-medium capitalize">{currentUser.role}</p>
            </div>
          </div>
        </div>

        {/* Refresh Button at the bottom */}
        <div className="flex justify-end mt-8">
          <button
            onClick={refreshAnalytics}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-red-700 transition-colors border"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
