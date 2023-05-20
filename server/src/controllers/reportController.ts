import { Sales } from "models/Sales";
import moment from "moment";
import { Controller } from "types/controller";
import JsonResponse from "utils/Response";
import { getLastDays } from "utils/query";
import { ReportByDateT, ReportStatsT } from "@shared/Report"

interface AggregatedData {
    _id: {
        day: number,
        month: number,
    },
    count: number
}


interface AggregatedDataByYear {
    _id: {
        year: number
    },
    count: number
}

const formatData = (data: AggregatedData[]) => {
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

const formatDataByMonth = (data: AggregatedData[]) => {
    return data.map(x=>{
        const month = moment(x._id.month + "", "M").format("MMM");
        const full_date = month
        return {
            label: full_date,
            value: x.count
        }
    })
}

const formatDataByYear = (data: AggregatedDataByYear[]) => {
    return data.map(x=>{
        return {
            label: x._id.year + "",
            value: x.count
        }
    })
}

export const getSales: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    try {
        const { gym_id } = res.locals.admin;
        const dateRange: ReportByDateT =  req.query.date_type as ReportByDateT;
        const dateQuery = () => {
            if(dateRange === "daily") return getLastDays(30);
            if(dateRange === "monthly") return {
                $gte: moment().startOf("year").toDate()
            }
        }
        let sales: AggregatedData[]|AggregatedDataByYear[];
        let report: ReportStatsT[] = [];
        //yearly
        if(dateRange === "yearly") {
            sales = await Sales.aggregate<AggregatedDataByYear>([
                {
                    $match: {
                        gym_id,
                    }
                },
                {
                    $group: {
                        _id: {
                            year: {$year: "$createdAt"}
                        },
                        count: {$sum: "$total"}
                    }
                },
                {
                    $sort: {
                        "_id.year": 1,
                    }
                }
            ])
            report = formatDataByYear(sales);
        } if(dateRange === "monthly") {
            sales = await Sales.aggregate<AggregatedData>([
                {
                    $match: {
                        gym_id,
                        createdAt: dateQuery(),
                    }
                },
                {
                    $group: {
                        _id: {
                            month: {$month: "$createdAt"},
                        },
                        count: {$sum: "$total"}
                    }
                },
                {
                    $sort: {
                        "_id.month": 1,
                    }
                }
            ])
            report = formatDataByMonth(sales);
        }
        else {
            sales = await Sales.aggregate<AggregatedData>([
                {
                    $match: {
                        gym_id,
                        createdAt: dateQuery(),
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
            report = formatData(sales);
        }
        jsonResponse.success(report);
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}