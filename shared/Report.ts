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