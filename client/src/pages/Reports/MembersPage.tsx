import Header from "components/Header/Header";
import PointOfSaleOutlinedIcon from '@mui/icons-material/PointOfSaleOutlined';
import Main from "components/Container/Main";
import { useState, useEffect } from "react"
import { MemberGrowthChartI, MemberReportMetricsI, ReportByDateT, ReportStatsT, RevenueGrowthChartI, RevenueReportMetrics } from "@shared/Report";
import { getMembersGrowthChart, getMembersMetrics, getSalesGrowthChart, getSalesMetrics, getSalesReport } from "api/report";
import { toastError } from "components/Toast/toast";
import { LineChartReport } from "./LineChartReport";
import { Select, MenuItem } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";

export default function MembersR(){
    const [dateRange, setDateRange] = useState<{from: null|moment.Moment, to: null|moment.Moment}>({from: moment().subtract(30, "days"), to: moment()})
    const [data, setData] = useState<MemberReportMetricsI>();
    const [chartData, setChartData] = useState<MemberGrowthChartI>();
    const fetchMetrics = async() => {
        const res = await getMembersMetrics();
        if(res.error) return toastError(res.message);
        setData(res.data);
    }
    const fetchGrowthChart = async() => {
        const res = await getMembersGrowthChart(dateRange);
        if(res.error) return toastError(res.message);
        setChartData(res.data);
    }
    useEffect(()=>{
        fetchMetrics();
    }, [])
    useEffect(()=>{
        fetchGrowthChart()
    }, [dateRange])
    if(!data) return <></>
    return(
        <>
            <Header title="Members Report" Icon={PointOfSaleOutlinedIcon} />
            <Main className="">
                <div className="flex w-full space-x-4">
                    <div className="flex-1 flex p-6 flex-col bg-white-100 rounded-md">
                        <div>
                            <h1 className="font-semibold text-2xl text-gray-700">Members</h1>
                        </div>
                        <div className="flex flex-col space-y-4">
                            <div className="text-gray-400 w-full text-center py-2 font-semibold">Total Metrics</div>
                            <MetricItem label = "Total Members" value={"" +data.total_members}  />
                            <MetricItem label = "Total members joined today" value={"" +data.total_members_joined_today}  />
                            <MetricItem label = "Total members joined this month" value={"" +data.total_members_joined_current_month}  />
                            <MetricItem label = "Total members joined this year" value={"" +data.total_members_joined_current_year}  />
                            <div className="text-gray-400 w-full text-center py-2 font-semibold">Average Metrics</div>
                            <MetricItem label = "Members per day" value={"" +data.members_per_day}  />
                            <MetricItem label = "Members per month" value={"" +data.members_per_month}  />
                            <MetricItem label = "Members per year" value={"" +data.members_per_year}  />
                        </div>
                    </div> 
                    <div className="flex-1 flex p-6 flex-col bg-white-100 rounded-md">
                        <div className="flex">
                            <h1 className="font-semibold text-2xl text-gray-700">Members Growth Chart</h1>
                        </div>
                        <div className="w-full flex space-x-4 items-center py-4">
                            <DatePicker
                            slotProps={{ textField: { size: 'small' } }}
                            className="flex-1"
                            maxDate={moment()}
                            value={dateRange.from}
                            onChange={val=>setDateRange({...dateRange, from: val})}
                            />
                            <div>To</div>
                            <DatePicker
                            slotProps={{ textField: { size: 'small' } }}
                            className="flex-1"
                            maxDate={moment()}
                            value={dateRange.to}
                            onChange={val=>setDateRange({...dateRange, to: val})}
                            />
                        </div>
                        <div className="flex-1 mt-4">
                            {chartData && <LineChartReport
                            data = {chartData.chart_data}
                            />}
                        </div>
                        <div className="mt-4 text-base space-y-2 text-gray-500 text-[0.9rem]">
                            <div className="flex">
                                <div>Total members</div>
                                <div className="ml-auto">{chartData?.total_members || 0}</div>
                            </div>
                        </div>
                    </div> 
                </div>
            </Main>
        </>
    )
}

function MetricItem({label, value}: {label: string, value: string}){
    return(
        <div className="flex w-full">
            <div>{label}</div>
            <div className = "ml-auto">{value}</div>
        </div>
    )
}