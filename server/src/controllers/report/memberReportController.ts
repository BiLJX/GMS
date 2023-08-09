import { MemberGrowthChartI, RevenueGrowthChartI } from "@shared/Report";
import { Gym } from "models/Gym";
import { Member } from "models/Member";
import { Sales } from "models/Sales";
import moment from "moment";
import { Controller } from "types/controller";
import JsonResponse from "utils/Response";
import { getCurrentMonth, getCurrentYear, getToday } from "utils/query";




export const getMembersMetrics: Controller = async(req, res) => {
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
            //total members
            {
                $lookup: {
                    from: "members",
                    as: "total_members",
                    pipeline: [
                        {
                            $match: {gym_id}
                        },
                        {
                            $group: {
                                _id: null,
                                value: {$count: {}}
                            }
                        }
                    ],                    
                }
            },
            //total members today
            {
                $lookup: {
                    from: "members",
                    as: "total_members_joined_today",
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
                                value: {$count: {}}
                            }
                        }
                    ],                    
                }
            },
            //total members current month
            {
                $lookup: {
                    from: "members",
                    as: "total_members_joined_current_month",
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
                                value: {$count: {}}
                            }
                        }
                    ],                    
                }
            },
            //total revenue made this year
            {
                $lookup: {
                    from: "members",
                    as: "total_members_joined_current_year",
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
                                value: {$count: {}}
                            }
                        }
                    ],                    
                }
            },
            //members per day
            {
                $lookup: {
                    from: "members",
                    as: "members_per_day",
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
                                count: {$count: {}},
                            }
                        },
                        {
                            $group: {
                                _id: null,
                                value: {$avg: "$count"}
                            }
                        }
                    ],                    
                }
            }, 
            //revenue per month
            {
                $lookup: {
                    from: "members",
                    as: "members_per_month",
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
                                count: {$count: {}},
                            }
                        },
                        {
                            $group: {
                                _id: null,
                                value: {$avg: "$count"}
                            }
                        }
                    ],                    
                }
            }, 
            //revenue per year
            {
                $lookup: {
                    from: "members",
                    as: "members_per_year",
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
                                count: {$count: {}},
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
                    path: "$total_members"
                }
            },
            {
                $unwind: {
                    preserveNullAndEmptyArrays: true,
                    path: "$total_members_joined_today"
                }
            },
            {
                $unwind: {
                    preserveNullAndEmptyArrays: true,
                    path: "$total_members_joined_current_month"
                }
            },
            {
                $unwind: {
                    preserveNullAndEmptyArrays: true,
                    path: "$total_members_joined_current_year"
                }
            },
            {
                $unwind: {
                    preserveNullAndEmptyArrays: true,
                    path: "$members_per_day"
                }
            },
            {
                $unwind: {
                    preserveNullAndEmptyArrays: true,
                    path: "$members_per_month"
                }
            },
            {
                $unwind: {
                    preserveNullAndEmptyArrays: true,
                    path: "$members_per_year"
                }
            },
            //adding field
            {
                $addFields: {
                    "total_members": {$round:  ["$total_members.value", 0]},
                    "total_members_joined_today": {$round: ["$total_members_today.value", 0]},
                    "total_members_joined_current_month": {$round: ["$total_members_current_month.value",0]},
                    "total_members_joined_current_year": {$round: ["$total_members_current_year.value",0]},
                    "members_per_day": {$round: ["$members_per_day.value",0]},
                    "members_per_month": {$round: ["$members_per_month.value",0]},
                    "members_per_year": {$round: ["$members_per_year.value", 0]},
                }
            },
            //null checking
            {
                $addFields: {
                    "total_members": { $ifNull: [ "$total_members", 0 ] },
                    "total_members_joined_today": { $ifNull: [ "$total_members_today", 0 ] },
                    "total_members_joined_current_month": { $ifNull: [ "$total_members_current_month", 0 ] },
                    "total_members_joined_current_year": { $ifNull: [ "$total_members_current_year", 0 ] },
                    "members_per_day": { $ifNull: [ "$members_per_day", 0 ] },
                    "members_per_month": { $ifNull: [ "$members_per_month", 0 ] },
                    "members_per_year": { $ifNull: [ "$members_per_year", 0 ] },
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

export const getMemberGrowthChart: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    try {
        const { gym_id } = res.locals.admin;
        const query: {from: null|moment.Moment, to: null|moment.Moment} = req.query as any;
        if(!query) return jsonResponse.clientError("Invalid date query");
        const { from, to } = query;
        if(!from && !to) return jsonResponse.clientError("Enter date");
        const members = await Member.aggregate([
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
        const metric = await Member.aggregate<{_id: null, count: number, avg: number}>([
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
                    count: {$count: {}},
                    avg: {$avg: "$total"}
                }
            }
        ])
        const data: MemberGrowthChartI = {
            total_members: parseFloat(Number(metric[0]?.count || 0).toFixed(2)),
            chart_data: formatData(members)
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

