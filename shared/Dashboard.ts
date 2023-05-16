import { MemberT } from "./Member"

export interface TotalStatsT {
    value: number,
    increase: number
}

export interface DashboardStatsT {
    total_members: TotalStatsT,
    total_members_today: TotalStatsT,
    total_sales_today: TotalStatsT,
    total_monthly_sales: TotalStatsT,

    daily_sales: Array<{date: string, value: number}>,
    daily_members: Array<{date: string, value: number}>,
    membership_category: Array<{membership_name: string, total_members: string}>,
    expired_memebrs: MemberT[]
}

