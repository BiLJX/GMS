import { Member } from "models/Member";
import { Sales } from "models/Sales";
import { Controller } from "types/controller";
import JsonResponse from "utils/Response";
import { getCurrentMonth, getLastDays, getLastMonth, getToday } from "utils/query";
import { DashboardStatsT, TotalStatsT } from "@shared/Dashboard";
import { enumerateDays } from "utils/date"
import moment from "moment";
import { MembershipType } from "models/MembershipType";
export const getDashboardStats: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    try {
        const gym_id = res.locals.admin.gym_id;
        const formatString = "Do MMM"
        const days = enumerateDays(30).map(x=>moment(x).format(formatString));
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
        const daily_sales_data = await Sales.aggregate([
            {
                $match: {
                    gym_id,
                    createdAt: getLastDays(30)
                }
            },
            {
                $group: {
                    _id: {
                        day:{$dayOfMonth: "$createdAt"},
                        month: {$month: "$createdAt"}

                    },
                    count: {$sum: "$total"}
                }
            },
            {
                $sort: {
                    "_id.month": 1,
                    "_id.day": 1,
                    
                }
            }
        ])

        const daily_members_data = await Member.aggregate([
            {
                $match: {
                    gym_id,
                    createdAt: getLastDays(30)
                }
            },
            {
                $group: {
                    _id: {
                        day:{$dayOfMonth: "$createdAt"},
                        month: {$month: "$createdAt"}

                    },
                    count: {$count: {}}
                }
            },
            {
                $sort: {
                    "_id.month": 1,
                    "_id.day": 1,
                    
                }
            }
        ])

        const daily_sales = daily_sales_data.map(x=>{
            const month = moment(x._id.month + "", "M").format("MMM");
            const date = moment(x._id.day + "", "D").format("Do");
            const full_date = month + " " + date;
            return {
                date: full_date,
                value: x.count
            }
        })

        const daily_members = daily_members_data.map(x=>{
            const month = moment(x._id.month + "", "M").format("MMM");
            const date = moment(x._id.day + "", "D").format("Do");
            const full_date = month + " " + date;
            return {
                date: full_date,
                value: x.count
            }
        })

        const membershipCategory_data = await Member.aggregate([
            {
                $match: {
                    gym_id
                }
            },
            {
                $lookup: {
                    as: "membership_data",
                    from: "membership_types",
                    localField: "membership_type_id",
                    foreignField: "membership_type_id"
                }
            },
            {
                $unwind: {
                    path: "$membership_data",
                    preserveNullAndEmptyArrays: true 
                }
            },
            {
                $group: {
                    _id: "$membership_data.membership_name",
                    count: {$count: {}}
                }
            },
            {
                $sort: {
                    count: -1
                }
            },
            {
                $limit: 4
            }
        ])
        const today = new Date()
        const expiredMembers = await Member.aggregate([
            {
                $match: {
                    gym_id
                }
            },
            {
                $lookup: {
                    from: "membership_statuses",
                    localField: "member_id",
                    foreignField: "member_id",
                    as: "membership_status",
                }
            },
            {
                $unwind: "$membership_status"
            },
            {
                $addFields: {
                    today
                }
            },
            {
                $match: {
                    $expr: {
                        $gt: [today, "$membership_status.expire_date"]
                    }
                }
            }
        ])
        

        const member_increase = parseFloat((((total_members_monthly_count - total_members_prev_month) / total_members_prev_month)*100).toFixed(1))
        const sales_increase = parseFloat((((total_monthly_sales_count - total_sales_prev_month) / total_sales_prev_month)*100).toFixed(1))
        const dashboardStats: DashboardStatsT = {
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
            },
            membership_category: membershipCategory_data.map(x=>({
                membership_name: x._id,
                total_members: x.count
            })),
            daily_sales,
            daily_members,
            expired_memebrs: expiredMembers
        }
        jsonResponse.success(dashboardStats)
    } catch (error) {
        console.log(error);
        jsonResponse.serverError()
    }
}