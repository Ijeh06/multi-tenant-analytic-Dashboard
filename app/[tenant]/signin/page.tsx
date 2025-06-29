'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTenant } from '@/contexts/tenant-context';
import { authenticateUser } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, LogIn, Building2 } from 'lucide-react';

export default function SignInPage() {
  const { tenant, user, loading } = useTenant();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect if already authenticated
  useEffect(() => {
    if (!loading && user && tenant) {
      router.replace(`/${tenant.slug}/dashboard`);
    }
  }, [user, tenant, loading, router]);

  // Demo users for quick access
  const demoUsers = [
    { email: 'admin@acme.com', password: 'admin123', role: 'Admin', description: 'Full system access' },
    { email: 'manager@acme.com', password: 'manager123', role: 'Manager', description: 'Department management' },
    { email: 'viewer@acme.com', password: 'viewer123', role: 'Viewer', description: 'Read-only access' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Authenticate user
      const authenticatedUser = authenticateUser(formData.email, formData.password);
      
      if (authenticatedUser && authenticatedUser.tenantId === tenant?.id) {
        // Store user session
        localStorage.setItem('currentUser', JSON.stringify(authenticatedUser));
        
        // Trigger auth change event for same-tab updates
        window.dispatchEvent(new Event('authChange'));
        
        // Redirect to dashboard
        router.push(`/${tenant.slug}/dashboard`);
      } else {
        setError('Invalid email or password. Try one of the demo accounts below.');
      }
    } catch (err) {
      setError('An error occurred during sign in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (email: string, password: string) => {
    setFormData({ email, password });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If user is already authenticated, show loading while redirecting
  if (user && tenant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/50 px-4 py-12 bg-blue-600">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 space-y-8">
        {/* Header */}
        <div className="text-center">
          <div 
            className="mx-auto h-16 w-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg"
            style={{ backgroundColor: tenant?.theme.primaryColor || '#3B82F6' }}
          >
            {tenant?.name.charAt(0).toUpperCase() || 'T'}
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Welcome to {tenant?.name || 'Dashboard'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your account to continue
          </p>
        </div>

        {/* Sign In Form */}
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    className="h-12 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full h-12 text-lg font-semibold"
                disabled={isLoading}
                style={{ backgroundColor: tenant?.theme.primaryColor || '#3B82F6' }}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing In...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </div>
                )}
              </Button>
            </form>

            {/* Demo Accounts */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Demo Accounts</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {demoUsers.map((user, index) => (
                  <button
                    key={index}
                    onClick={() => handleDemoLogin(user.email, user.password)}
                    className="w-full p-3 text-left border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">{user.role}</div>
                        <div className="text-sm text-gray-500">{user.description}</div>
                        <div className="text-xs text-gray-400 mt-1">{user.email}</div>
                      </div>
                      <div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                          user.role === 'Admin' ? 'bg-red-500' :
                          user.role === 'Manager' ? 'bg-blue-500' : 'bg-green-500'
                        }`}
                      >
                        {user.role.charAt(0)}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Links */}
            <div className="text-center space-y-2">
              <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Forgot your password?
              </button>
              <div className="text-xs text-gray-500">
                Don't have an account? Contact your administrator
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tenant Info */}
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200">
            <Building2 className="h-4 w-4 text-gray-400 mr-2" />
            <span className="text-sm text-gray-600">
              {tenant?.name} • Multi-Tenant Dashboard
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500">
          <p>© 2024 {tenant?.name || 'Multi-Tenant Dashboard'}. All rights reserved.</p>
          <p className="mt-1">Secure • Scalable • Multi-Tenant</p>
        </div>
      </div>
    </div>
  );
}