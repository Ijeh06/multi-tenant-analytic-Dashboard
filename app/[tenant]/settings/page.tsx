'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useTenant } from '@/contexts/tenant-context';
import { hasPermission } from '@/lib/auth';
import { Settings, Palette, Shield, Bell } from 'lucide-react';

export default function SettingsPage() {
  const { tenant, user } = useTenant();
  const canEditSettings = user && hasPermission(user, 'settings', 'write');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">
            Manage your organization settings and preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Organization Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Organization</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="org-name">Organization Name</Label>
                <Input 
                  id="org-name"
                  value={tenant?.name || ''}
                  disabled={!canEditSettings}
                />
              </div>
              <div>
                <Label htmlFor="org-slug">URL Slug</Label>
                <Input 
                  id="org-slug"
                  value={tenant?.slug || ''}
                  disabled={!canEditSettings}
                />
              </div>
              {canEditSettings && (
                <Button>Save Changes</Button>
              )}
            </CardContent>
          </Card>

          {/* Theme Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="h-5 w-5" />
                <span>Appearance</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="primary-color">Primary Color</Label>
                <div className="flex items-center space-x-2">
                  <Input 
                    id="primary-color"
                    type="color"
                    value={tenant?.theme.primaryColor || '#3B82F6'}
                    disabled={!canEditSettings}
                    className="w-16 h-10"
                  />
                  <Input 
                    value={tenant?.theme.primaryColor || '#3B82F6'}
                    disabled={!canEditSettings}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="secondary-color">Secondary Color</Label>
                <div className="flex items-center space-x-2">
                  <Input 
                    id="secondary-color"
                    type="color"
                    value={tenant?.theme.secondaryColor || '#10B981'}
                    disabled={!canEditSettings}
                    className="w-16 h-10"
                  />
                  <Input 
                    value={tenant?.theme.secondaryColor || '#10B981'}
                    disabled={!canEditSettings}
                  />
                </div>
              </div>
              {canEditSettings && (
                <Button>Apply Theme</Button>
              )}
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Security</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-500">
                    Require 2FA for all users
                  </p>
                </div>
                <Switch disabled={!canEditSettings} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Session Timeout</Label>
                  <p className="text-sm text-gray-500">
                    Auto-logout after inactivity
                  </p>
                </div>
                <Switch disabled={!canEditSettings} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>IP Restrictions</Label>
                  <p className="text-sm text-gray-500">
                    Limit access by IP address
                  </p>
                </div>
                <Switch disabled={!canEditSettings} />
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notifications</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-gray-500">
                    Receive email alerts
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Real-time Alerts</Label>
                  <p className="text-sm text-gray-500">
                    Browser notifications
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Weekly Reports</Label>
                  <p className="text-sm text-gray-500">
                    Analytics summary emails
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </div>

        {!canEditSettings && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800">
              You have read-only access to settings. Contact an administrator to make changes.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}