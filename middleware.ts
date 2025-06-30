import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { validateTenant } from '@/lib/tenants';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Extract tenant from URL path
  const pathSegments = pathname.split('/').filter(Boolean);
  const tenantSlug = pathSegments[0];

  // Handle root path
  if (!tenantSlug) {
    return NextResponse.redirect(new URL('/acme/signin', request.url));
  }

  // Validate tenant
  if (!validateTenant(tenantSlug)) {
    return NextResponse.redirect(new URL('/404', request.url));
  }

  // Add tenant info to headers for server components
  const response = NextResponse.next();
  response.headers.set('x-tenant-slug', tenantSlug);
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};