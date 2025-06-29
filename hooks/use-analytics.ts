'use client';

import { useState, useEffect, useCallback } from 'react';
import { AnalyticsData } from '@/types';
import { getCachedAnalytics } from '@/lib/analytics';

export function useAnalytics(tenantId: string, refreshInterval: number = 30000) {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      const analyticsData = await getCachedAnalytics(tenantId);
      setData(analyticsData);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch analytics');
    } finally {
      setLoading(false);
    }
  }, [tenantId]);

  useEffect(() => {
    fetchData();

    // Set up real-time updates
    const interval = setInterval(fetchData, refreshInterval);

    return () => clearInterval(interval);
  }, [fetchData, refreshInterval]);

  return {
    data,
    loading,
    error,
    lastUpdated,
    refetch: fetchData,
  };
}