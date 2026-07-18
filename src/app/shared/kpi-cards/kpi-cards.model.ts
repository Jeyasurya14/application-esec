export interface KpiMetric {
  id: string;
  label: string;
  value: number | string;
  suffix?: string;
  prefix?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  icon?: string;
  formatter?: (value: number | string) => string;
}

export interface KpiCardsConfig {
  metrics: readonly KpiMetric[];
  columns?: 2 | 3 | 4 | 5 | 6;
}
