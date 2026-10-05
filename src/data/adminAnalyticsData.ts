export interface AdminPlatformMetrics {
  dailyActiveUsers: number;
  totalEnrollments: number;
  completionRate: number;
  revenue: number;
}

export interface AdminAnalyticsTrend {
  label: string;
  activeUsers: number;
  enrollments: number;
}

export interface RevenueBreakdown {
  label: string;
  amount: number;
  percentage: number;
}

export const adminPlatformMetrics: AdminPlatformMetrics = {
  dailyActiveUsers: 428,
  totalEnrollments: 1846,
  completionRate: 68,
  revenue: 248600,
};

export const adminAnalyticsTrend: AdminAnalyticsTrend[] = [
  {
    label: 'Mon',
    activeUsers: 312,
    enrollments: 41,
  },
  {
    label: 'Tue',
    activeUsers: 346,
    enrollments: 49,
  },
  {
    label: 'Wed',
    activeUsers: 381,
    enrollments: 53,
  },
  {
    label: 'Thu',
    activeUsers: 359,
    enrollments: 46,
  },
  {
    label: 'Fri',
    activeUsers: 402,
    enrollments: 62,
  },
  {
    label: 'Sat',
    activeUsers: 417,
    enrollments: 58,
  },
  {
    label: 'Sun',
    activeUsers: 428,
    enrollments: 66,
  },
];

export const revenueBreakdown: RevenueBreakdown[] = [
  {
    label: 'Standard courses',
    amount: 112400,
    percentage: 45,
  },
  {
    label: 'Premium courses',
    amount: 98600,
    percentage: 40,
  },
  {
    label: 'Other learning plans',
    amount: 37600,
    percentage: 15,
  },
];