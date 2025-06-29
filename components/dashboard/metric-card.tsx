'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  trend?: number[];
  icon?: React.ReactNode;
  className?: string;
  loading?: boolean;
}

export function MetricCard({ 
  title, 
  value, 
  change, 
  trend, 
  icon, 
  className,
  loading = false 
}: MetricCardProps) {
  if (loading) {
    return (
      <Card className={cn("animate-pulse", className)}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-4 w-4 bg-gray-200 rounded"></div>
        </CardHeader>
        <CardContent>
          <div className="h-8 bg-gray-200 rounded w-20 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
        </CardContent>
      </Card>
    );
  }

  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;

  return (
    <Card className={cn("transition-all duration-200 hover:shadow-md", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-1">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>
        {change !== undefined && (
          <div className="flex items-center text-xs">
            {isPositive && <TrendingUp className="h-3 w-3 text-green-500 mr-1" />}
            {isNegative && <TrendingDown className="h-3 w-3 text-red-500 mr-1" />}
            <span className={cn(
              "font-medium",
              isPositive && "text-green-500",
              isNegative && "text-red-500",
              change === 0 && "text-muted-foreground"
            )}>
              {change > 0 ? '+' : ''}{change}%
            </span>
            <span className="text-muted-foreground ml-1">from last period</span>
          </div>
        )}
        {trend && trend.length > 0 && (
          <div className="mt-2 h-2 bg-gray-100 rounded overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-1000"
              style={{ width: `${Math.max(0, Math.min(100, (trend[trend.length - 1] / Math.max(...trend)) * 100))}%` }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}