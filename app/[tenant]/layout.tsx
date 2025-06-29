import { TenantProvider } from '@/contexts/tenant-context';
import { getTenant, mockTenants } from '@/lib/tenants';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return mockTenants.map((tenant) => ({
    tenant: tenant.slug,
  }));
}

export default function TenantLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { tenant: string };
}) {
  const tenant = getTenant(params.tenant);
  
  if (!tenant) {
    notFound();
  }

  return (
    <TenantProvider tenantSlug={params.tenant}>
      <div
        style={{
          '--tenant-primary': tenant.theme.primaryColor,
          '--tenant-secondary': tenant.theme.secondaryColor,
        } as React.CSSProperties}
        className="min-h-screen"
      >
        {children}
      </div>
    </TenantProvider>
  );
}