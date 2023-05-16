import { Member } from "models/Member";
import { Sales } from "models/Sales";
import { Controller } from "types/controller";
import JsonResponse from "utils/Response";
import { getCurrentMonth, getLastMonth, getToday } from "utils/query";
import { DashboardStatsT, TotalStats } from "@shared/Dashboard"
export const getDashboardStats: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    try {
        const gym_id = res.locals.admin.gym_id;
        const total_members_count =(await Member.aggregate([
            {
                $match: {gym_id}
            },
            {
                $group: {
                    _id: null,
                    count: {$count: {}}
                }
            },
            {
                $project: {
                    _id: 0
                }
            }
        ]))[0]?.count || 0;
        const total_members_today_count = (await Member.aggregate([
            {
                $match: {
                    joined_date: getToday(),
                    gym_id
                }
            },
            {
                $group: {
                    _id: null,
                    count: {$count: {}}
                }
            },
            {
                $project: {
                    _id: 0
                }
            }
        ]))[0]?.count || 0;
        const total_members_monthly_count = (await Member.aggregate([
            {
                $match: {
                    joined_date: getCurrentMonth(),
                    gym_id
                }
            },
            {
                $group: {
                    _id: null,
                    count: {$count: {}}
                }
            },
            {
                $project: {
                    _id: 0
                }
            }
        ]))[0]?.count || 0;
        const total_members_prev_month = (await Member.aggregate([
            {
                $match: {
                    gym_id,
                    createdAt: getLastMonth()
                }
            },
            {
                $group: {
                    _id: null,
                    count: {$count: {}}
                }
            },
        ]))[0]?.count || 0;
        const total_monthly_sales_count = (await Sales.aggregate([
            {
                $match: {
                    gym_id,
                    createdAt: getCurrentMonth()
                }
            },
            {
                $group: {
                    _id: null,
                    count: {$sum: "$total"}
                }
            }
        ]))[0]?.count || 0;
        const total_sales_today_count = (await Sales.aggregate([
            {
                $match: {
                    gym_id,
                    createdAt: getToday()
                }
            },
            {
                $group: {
                    _id: null,
                    count: {$sum: "$total"}
                }
            }
        ]))[0]?.count || 0;

        const total_sales_prev_month = (await Sales.aggregate([
            {
                $match: {
                    gym_id,
                    createdAt: getLastMonth()
                }
            },
            {
                $group: {
                    _id: null,
                    count: {$sum: "$total"}
                }
            }
        ]))[0]?.count || 0;

        console.log(total_monthly_sales_count)
        const member_increase = parseFloat(((total_members_monthly_count - total_members_prev_month) / total_members_prev_month).toFixed(2))
        const sales_increase = parseFloat(((total_monthly_sales_count - total_sales_prev_month) / total_sales_prev_month).toFixed(2))
        const dashboardStats = {
            total_members: {
                value: total_members_count,
                increase: member_increase
            },
            total_members_today: {
                value: total_members_today_count,
                increase: member_increase
            },
            total_monthly_sales: {
                value: total_monthly_sales_count,
                increase: sales_increase
            },
            total_sales_today: {
                value: total_sales_today_count,
                increase: sales_increase
            }
        }
        jsonResponse.success(dashboardStats)
    } catch (error) {
        console.log(error);
        jsonResponse.serverError()
    }
}