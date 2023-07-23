import { RevenueGrowthChartI } from "@shared/Report";
import { Gym } from "models/Gym";
import { Sales } from "models/Sales";
import moment from "moment";
import { Controller } from "types/controller";
import JsonResponse from "utils/Response";
import { getCurrentMonth, getCurrentYear, getToday } from "utils/query";




export const getRevenueMetrics: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    try {
        const { gym_id } = res.locals.admin;
        //total metrics
        const data = await Gym.aggregate([
            {
                $match: {
                    gym_id
                }
            },
            //total revenue
            {
                $lookup: {
                    from: "sales",
                    as: "total_revenue",
                    pipeline: [
                        {
                            $match: {gym_id}
                        },
                        {
                            $group: {
                                _id: null,
                                value: {$sum: "$total"}
                            }
                        }
                    ],                    
                }
            },
            //total revenue made today
            {
                $lookup: {
                    from: "sales",
                    as: "total_revenue_today",
                    pipeline: [
                        {
                            $match: {
                                gym_id,
                                createdAt: getToday()
                            }
                        },
                        {
                            $group: {
                                _id: null,
                                value: {$sum: "$total"}
                            }
                        }
                    ],                    
                }
            },
            //total revenue made current month
            {
                $lookup: {
                    from: "sales",
                    as: "total_revenue_current_month",
                    pipeline: [
                        {
                            $match: {
                                gym_id,
                                createdAt: getCurrentMonth()
                            }
                        },
                        {
                            $group: {
                                _id: null,
                                value: {$sum: "$total"}
                            }
                        }
                    ],                    
                }
            },
            //total revenue made this year
            {
                $lookup: {
                    from: "sales",
                    as: "total_revenue_current_year",
                    pipeline: [
                        {
                            $match: {
                                gym_id,
                                createdAt: getCurrentYear()
                            }
                        },
                        {
                            $group: {
                                _id: null,
                                value: {$sum: "$total"}
                            }
                        }
                    ],                    
                }
            },
            //average revenue
            {
                $lookup: {
                    from: "sales",
                    as: "average_revenue",
                    pipeline: [
                        {
                            $match: {
                                gym_id,
                            }
                        },
                        {
                            $group: {
                                _id: null,
                                value: {$avg: "$total"}
                            }
                        }
                    ],                    
                }
            },
            //revenue per day
            {
                $lookup: {
                    from: "sales",
                    as: "revenue_per_day",
                    pipeline: [
                        {
                            $match: {
                                gym_id,
                            }
                        },
                        {
                            $group: {
                                _id: {
                                    day: {$dayOfMonth: "$createdAt"},
                                },
                                sum: {$sum: "$total"},
                            }
                        },
                        {
                            $group: {
                                _id: null,
                                value: {$avg: "$sum"}
                            }
                        }
                    ],                    
                }
            }, 
            //revenue per month
            {
                $lookup: {
                    from: "sales",
                    as: "revenue_per_month",
                    pipeline: [
                        {
                            $match: {
                                gym_id,
                            }
                        },
                        {
                            $group: {
                                _id: {
                                    month: {$month: "$createdAt"},
                                },
                                sum: {$sum: "$total"},
                            }
                        },
                        {
                            $group: {
                                _id: null,
                                value: {$avg: "$sum"}
                            }
                        }
                    ],                    
                }
            }, 
            //revenue per year
            {
                $lookup: {
                    from: "sales",
                    as: "revenue_per_year",
                    pipeline: [
                        {
                            $match: {
                                gym_id,
                            }
                        },
                        {
                            $group: {
                                _id: {
                                    year: {$year: "$createdAt"},
                                },
                                sum: {$sum: "$total"},
                            }
                        },
                        {
                            $group: {
                                _id: null,
                                value: {$avg: "$sum"}
                            }
                        }
                    ],                    
                }
            }, 
            //unwinds
            {
                $unwind: {
                    preserveNullAndEmptyArrays: true,
                    path: "$total_revenue"
                }
            },
            {
                $unwind: {
                    preserveNullAndEmptyArrays: true,
                    path: "$total_revenue_today"
                }
            },
            {
                $unwind: {
                    preserveNullAndEmptyArrays: true,
                    path: "$total_revenue_current_month"
                }
            },
            {
                $unwind: {
                    preserveNullAndEmptyArrays: true,
                    path: "$total_revenue_current_year"
                }
            },
            {
                $unwind: {
                    preserveNullAndEmptyArrays: true,
                    path: "$average_revenue"
                }
            },
            {
                $unwind: {
                    preserveNullAndEmptyArrays: true,
                    path: "$revenue_per_day"
                }
            },
            {
                $unwind: {
                    preserveNullAndEmptyArrays: true,
                    path: "$revenue_per_month"
                }
            },
            {
                $unwind: {
                    preserveNullAndEmptyArrays: true,
                    path: "$revenue_per_year"
                }
            },
            //adding field
            {
                $addFields: {
                    "total_revenue": {$round:  ["$total_revenue.value", 2]},
                    "total_revenue_today": {$round: ["$total_revenue_today.value", 2]},
                    "total_revenue_current_month": {$round: ["$total_revenue_current_month.value",2]},
                    "total_revenue_current_year": {$round: ["$total_revenue_current_year.value",2]},
                    "average_revenue": {$round: ["$average_revenue.value",2]},
                    "revenue_per_day": {$round: ["$revenue_per_day.value",2]},
                    "revenue_per_month": {$round: ["$revenue_per_month.value",2]},
                    "revenue_per_year": {$round: ["$revenue_per_year.value", 2]},
                }
            },
            //null checking
            {
                $addFields: {
                    "total_revenue": { $ifNull: [ "$total_revenue", 0 ] },
                    "total_revenue_today": { $ifNull: [ "$total_revenue_today", 0 ] },
                    "total_revenue_current_month": { $ifNull: [ "$total_revenue_current_month", 0 ] },
                    "total_revenue_current_year": { $ifNull: [ "$total_revenue_current_year", 0 ] },
                    "average_revenue": { $ifNull: [ "$average_revenue", 0 ] },
                    "revenue_per_day": { $ifNull: [ "$revenue_per_day", 0 ] },
                    "revenue_per_month": { $ifNull: [ "$revenue_per_month", 0 ] },
                    "revenue_per_year": { $ifNull: [ "$revenue_per_year", 0 ] },
                }
            },
        ])
        if(!data.length) return jsonResponse.clientError("Could not proccess your metrics");
        jsonResponse.success(data[0])
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}

export const getRevenueGrowthChart: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    try {
        const { gym_id } = res.locals.admin;
        const query: {from: null|moment.Moment, to: null|moment.Moment} = req.query as any;
        if(!query) return jsonResponse.clientError("Invalid date query");
        const { from, to } = query;
        if(!from && !to) return jsonResponse.clientError("Enter date");
        const revenues = await Sales.aggregate([
            {
                $match: {
                    gym_id,
                    createdAt: {
                        $gte: moment(from).toDate(),
                        $lte: moment(to).toDate()
                    }
                }
            },
            {
                $group: {
                    _id: {
                        month: {$month: "$createdAt"},
                        day:{$dayOfMonth: "$createdAt"},
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
        const metric = await Sales.aggregate<{_id: null, sum: number, avg: number}>([
            {
                $match: {
                    gym_id,
                    createdAt: {
                        $gte: moment(from).toDate(),
                        $lte: moment(to).toDate()
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    sum: {$sum: "$total"},
                    avg: {$avg: "$total"}
                }
            }
        ])
        const data: RevenueGrowthChartI = {
            total_revenue: parseFloat(Number(metric[0]?.sum || 0).toFixed(2)),
            average_revenue: parseFloat(Number(metric[0]?.avg || 0).toFixed(2)),
            chart_data: formatData(revenues)
        }
        jsonResponse.success(data)
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}

interface AggregatedData {
    _id: {
        day: number,
        month: number,
    },
    count: number
}

function formatData (data: AggregatedData[]) {
    return data.map(x=>{
        const month = moment(x._id.month + "", "M").format("MMM");
        const date = moment(x._id.day + "", "D").format("Do");
        const full_date = month + " " + date;
        return {
            label: full_date,
            value: x.count
        }
    })
}

