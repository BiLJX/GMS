import { MemberT } from "./Member"

export interface TotalStats {
    value: number,
    increase: number
}

export interface DashboardStatsT {
    total_members: TotalStats,
    total_members_today: TotalStats,
    total_sales_today: TotalStats,
    total_monthly_sales: TotalStats,
    daily_sales: Array<{day: string, value: number}>,
    daily_members: Array<{day: string, value: number}>,
    membership_category: Array<{membership_name: string, total_members: string}>,
    expired_memebrs: MemberT[]
}