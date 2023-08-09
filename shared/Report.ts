export type ReportByDateT = "daily" | "monthly" | "yearly";

export interface ReportStatsT {
    label: string,
    value: number
}

export interface RevenueReportMetrics {
    total_revenue: number,
    total_revenue_today: number,
    total_revenue_current_month: number,
    total_revenue_current_year: number,
    average_revenue: number,
    revenue_per_day: number,
    revenue_per_month: number,
    revenue_per_year: number
}

export interface RevenueGrowthChartI {
    chart_data: ReportStatsT[],
    total_revenue: number,
    average_revenue: number
}

export interface MemberReportMetricsI {
    total_members: number,
    total_members_joined_today: number,
    total_members_joined_current_month: number,
    total_members_joined_current_year: number,
    members_per_day: number,
    members_per_month: number,
    members_per_year: number
}

export interface MemberGrowthChartI {
    chart_data: ReportStatsT[],
    total_members: number,
}