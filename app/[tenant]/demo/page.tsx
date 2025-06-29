'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { useTenant } from '@/contexts/tenant-context';
import { Building2, Users, Shield, Zap, BarChart3, Lock, Globe, Layers } from 'lucide-react';

export default function DemoPage() {
  const { tenant, user } = useTenant();
  const [selectedDemo, setSelectedDemo] = useState<'tenants' | 'roles' | 'performance' | 'architecture'>('tenants');

  const performanceMetrics = {
    loadTime: '1.2s',
    bundleSize: '245KB',
    lighthouse: 95,
    cacheHitRate: '89%',
    apiResponseTime: '120ms',
    memoryUsage: '42MB'
  };

  const architectureFeatures = [
    {
      title: 'Multi-Tenant Architecture',
      description: 'Isolated data and configuration per tenant with shared infrastructure',
      icon: Building2,
      benefits: ['Cost efficiency', 'Scalability', 'Maintenance simplicity']
    },
    {
      title: 'Role-Based Access Control',
      description: 'Granular permissions system with hierarchical role management',
      icon: Shield,
      benefits: ['Security', 'Compliance', 'User experience']
    },
    {
      title: 'Performance Optimization',
      description: 'Code splitting, lazy loading, and intelligent caching strategies',
      icon: Zap,
      benefits: ['Fast loading', 'Better UX', 'Resource efficiency']
    },
    {
      title: 'Scalable Infrastructure',
      description: 'Component-based architecture with separation of concerns',
      icon: Layers,
      benefits: ['Maintainability', 'Extensibility', 'Team collaboration']
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Multi-Tenant Dashboard Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience a complete multi-tenant solution with role-based access control, 
            performance optimization, and scalable architecture.
          </p>
        </div>

        {/* Demo Navigation */}
        <div className="flex justify-center">
          <div className="bg-white rounded-full p-1 shadow-lg">
            {[
              { key: 'tenants', label: 'Multi-Tenant', icon: Building2 },
              { key: 'roles', label: 'User Roles', icon: Users },
              { key: 'performance', label: 'Performance', icon: BarChart3 },
              { key: 'architecture', label: 'Architecture', icon: Layers },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setSelectedDemo(key as any)}
                className={`flex items-center px-4 py-3 rounded-full transition-all ${
                  selectedDemo === key
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Demo Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {selectedDemo === 'tenants' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Building2 className="h-6 w-6 mr-3 text-blue-600" />
                Multi-Tenant Demonstration
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-4">
                    <div 
                      className="h-12 w-12 rounded-full flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: tenant?.theme.primaryColor }}
                    >
                      {tenant?.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <h3 className="font-semibold text-gray-900">{tenant?.name}</h3>
                      <p className="text-sm text-gray-500">{tenant?.slug}.example.com</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>Features:</strong> {tenant?.settings.features.join(', ')}</p>
                    <p><strong>Max Users:</strong> {tenant?.settings.maxUsers}</p>
                    <p><strong>Status:</strong> <span className="text-green-600">Active</span></p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-2">Tenant Isolation Features</h3>
                <ul className="text-blue-800 space-y-1 text-sm">
                  <li>• Separate data storage and user management</li>
                  <li>• Customizable branding and configuration</li>
                  <li>• Independent security and access policies</li>
                  <li>• Scalable resource allocation</li>
                </ul>
              </div>
            </div>
          )}

          {selectedDemo === 'roles' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Users className="h-6 w-6 mr-3 text-green-600" />
                Role-Based Access Control
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full flex items-center justify-center text-white font-bold bg-red-500">
                      A
                    </div>
                    <div className="ml-3">
                      <h3 className="font-semibold text-gray-900">Admin</h3>
                      <p className="text-sm text-gray-500">Full Access</p>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600"><strong>Permissions:</strong></p>
                    <div className="flex flex-wrap gap-1">
                      <span className="px-2 py-1 bg-gray-100 text-xs rounded-full">Full Access</span>
                      <span className="px-2 py-1 bg-gray-100 text-xs rounded-full">User Management</span>
                      <span className="px-2 py-1 bg-gray-100 text-xs rounded-full">Settings</span>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full flex items-center justify-center text-white font-bold bg-blue-500">
                      M
                    </div>
                    <div className="ml-3">
                      <h3 className="font-semibold text-gray-900">Manager</h3>
                      <p className="text-sm text-gray-500">Department Access</p>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600"><strong>Permissions:</strong></p>
                    <div className="flex flex-wrap gap-1">
                      <span className="px-2 py-1 bg-gray-100 text-xs rounded-full">Department Data</span>
                      <span className="px-2 py-1 bg-gray-100 text-xs rounded-full">Team Management</span>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full flex items-center justify-center text-white font-bold bg-green-500">
                      V
                    </div>
                    <div className="ml-3">
                      <h3 className="font-semibold text-gray-900">Viewer</h3>
                      <p className="text-sm text-gray-500">Read Only</p>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600"><strong>Permissions:</strong></p>
                    <div className="flex flex-wrap gap-1">
                      <span className="px-2 py-1 bg-gray-100 text-xs rounded-full">View Assigned</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="font-semibold text-green-900 mb-2">Security Features</h3>
                <ul className="text-green-800 space-y-1 text-sm">
                  <li>• Hierarchical permission system</li>
                  <li>• Department-based access control</li>
                  <li>• Dynamic UI rendering based on permissions</li>
                  <li>• Secure authentication and session management</li>
                </ul>
              </div>
            </div>
          )}

          {selectedDemo === 'performance' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <BarChart3 className="h-6 w-6 mr-3 text-purple-600" />
                Performance Metrics
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                {Object.entries(performanceMetrics).map(([key, value]) => (
                  <div key={key} className="text-center p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600 mb-2">{value}</div>
                    <div className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <h3 className="font-semibold text-purple-900 mb-2 flex items-center">
                    <Zap className="h-5 w-5 mr-2" />
                    Optimization Techniques
                  </h3>
                  <ul className="text-purple-800 space-y-1 text-sm">
                    <li>• Code splitting and lazy loading</li>
                    <li>• Component memoization</li>
                    <li>• Efficient state management</li>
                    <li>• Asset optimization and compression</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
                    <Globe className="h-5 w-5 mr-2" />
                    Scalability Features
                  </h3>
                  <ul className="text-blue-800 space-y-1 text-sm">
                    <li>• Horizontal scaling capabilities</li>
                    <li>• CDN integration ready</li>
                    <li>• Database query optimization</li>
                    <li>• Caching strategies implementation</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {selectedDemo === 'architecture' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Layers className="h-6 w-6 mr-3 text-indigo-600" />
                Architecture Overview
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {architectureFeatures.map((feature, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <feature.icon className="h-8 w-8 text-indigo-600 mr-3" />
                      <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-4">{feature.description}</p>
                    <div className="space-y-1">
                      {feature.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-center text-sm text-green-700">
                          <div className="h-1.5 w-1.5 bg-green-500 rounded-full mr-2"></div>
                          {benefit}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
                <h3 className="font-semibold text-indigo-900 mb-4 flex items-center">
                  <Lock className="h-5 w-5 mr-2" />
                  Security Implementations
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-indigo-800 mb-2">Authentication & Authorization</h4>
                    <ul className="text-indigo-700 space-y-1 text-sm">
                      <li>• JWT-based authentication</li>
                      <li>• Role-based access control</li>
                      <li>• Permission-based UI rendering</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-indigo-800 mb-2">Data Protection</h4>
                    <ul className="text-indigo-700 space-y-1 text-sm">
                      <li>• Tenant data isolation</li>
                      <li>• Secure API endpoints</li>
                      <li>• Input validation and sanitization</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Current User Info */}
        <div className="text-center">
          <div className="bg-white rounded-lg shadow-lg p-6 inline-block">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Current Session</h3>
            <p className="text-gray-600">
              Logged in as <strong>{user?.name}</strong> ({user?.role}) in <strong>{tenant?.name}</strong>
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}