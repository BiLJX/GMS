import { Gym } from "models/Gym";
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

