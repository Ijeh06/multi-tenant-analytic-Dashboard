'use client';

import React from 'react';
import { useTenant } from '@/contexts/tenant-context';
import { useAnalytics } from '@/hooks/use-analytics';
import AnalyticsWidget from './analytics-widget';
import { Eye, BarChart3, Activity } from 'lucide-react';

const ViewerDashboardContent: React.FC = () => {
  const { tenant, user } = useTenant();
  const { data: analyticsData, loading } = useAnalytics(tenant?.id || '');

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            My Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Viewer Access - {user.name}
          </p>
        </div>
        <div className="flex items-center px-4 py-2 bg-gray-100 rounded-lg">
          <Eye className="h-4 w-4 mr-2 text-gray-500" />
          <span className="text-gray-600">Read Only</span>
        </div>
      </div>

      {/* Access Notice */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
        <p className="text-blue-800 text-sm">
          You have viewer-level access. Contact your administrator for additional permissions.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Assigned Reports</p>
              <p className="text-2xl font-bold text-gray-900">5</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Activity className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Last Updated</p>
              <p className="text-sm font-medium text-gray-900">2 mins ago</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Eye className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Views Today</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
          </div>
        </div>
      </div>

      {/* Limited Analytics Widget */}
      <div className="grid grid-cols-1 gap-6">
        <AnalyticsWidget
          title="My Engagement Overview"
          value={analyticsData.engagement.value}
          change={analyticsData.engagement.change || 0}
          data={analyticsData.userGrowth.labels.map((label, index) => ({
            date: label,
            engagement: analyticsData.engagement.value + (Math.random() * 5 - 2.5)
          }))}
          dataKey="engagement"
          format={(value) => `${value}%`}
          color="#8B5CF6"
          clickable={false}
        />
      </div>

      {/* Assigned Content */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">My Assigned Content</h2>
        <div className="space-y-3">
          {[
            { name: 'Monthly Performance Report', status: 'Available', updated: '2 hours ago' },
            { name: 'User Activity Summary', status: 'Available', updated: '1 day ago' },
            { name: 'Engagement Metrics', status: 'Available', updated: '3 days ago' },
            { name: 'Weekly Overview', status: 'Pending', updated: 'Not yet available' },
          ].map((item, index) => (
            <div key={item.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">{item.name}</p>
                <p className="text-xs text-gray-500">Updated: {item.updated}</p>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                item.status === 'Available' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-gray-100 rounded-lg text-center">
          <p className="text-sm text-gray-600">
            Need access to more reports? Contact your manager or administrator.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewerDashboardContent;