import { AnalyticsData, DashboardWidget } from '@/types';

// Mock analytics data generator
export function generateMockAnalytics(): AnalyticsData {
  const baseValue = Math.floor(Math.random() * 1000) + 500;
  
  return {
    dailyActiveUsers: {
      value: baseValue,
      change: Math.floor(Math.random() * 20) - 10,
      trend: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100) + baseValue - 50)
    },
    revenue: {
      value: Math.floor(Math.random() * 50000) + 25000,
      change: Math.floor(Math.random() * 30) - 15,
      trend: Array.from({ length: 30 }, () => Math.floor(Math.random() * 5000) + 20000)
    },
    engagement: {
      value: Math.floor(Math.random() * 100),
      change: Math.floor(Math.random() * 10) - 5,
      trend: Array.from({ length: 30 }, () => Math.floor(Math.random() * 20) + 70)
    },
    userGrowth: {
      labels: Array.from({ length: 12 }, (_, i) => {
        const month = new Date();
        month.setMonth(month.getMonth() - (11 - i));
        return month.toLocaleDateString('en-US', { month: 'short' });
      }),
      data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 500) + 100)
    }
  };
}

export function getAnalyticsData(tenantId: string): Promise<AnalyticsData> {
  // Simulate API call with caching
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateMockAnalytics());
    }, Math.random() * 1000 + 500);
  });
}

// Cache implementation for performance
const analyticsCache = new Map<string, { data: AnalyticsData; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getCachedAnalytics(tenantId: string): Promise<AnalyticsData> {
  const cacheKey = `analytics-${tenantId}`;
  const cached = analyticsCache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  
  const data = await getAnalyticsData(tenantId);
  analyticsCache.set(cacheKey, { data, timestamp: Date.now() });
  
  return data;
}