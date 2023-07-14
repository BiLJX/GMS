import Header from "components/Header/Header";
import PointOfSaleOutlinedIcon from '@mui/icons-material/PointOfSaleOutlined';
import Main from "components/Container/Main";
import { useState, useEffect } from "react"
import { ReportByDateT, ReportStatsT, RevenueReportMetrics } from "@shared/Report";
import { getSalesMetrics, getSalesReport } from "api/report";
import { toastError } from "components/Toast/toast";
import { LineChartReport } from "./LineChartReport";
import { Select, MenuItem } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";

export default function SalesPage(){
    const [dateRange, setDateRange] = useState<{from: null|moment.Moment, to: null|moment.Moment}>({from: moment().subtract(30, "days"), to: moment()})
    const [data, setData] = useState<RevenueReportMetrics>()
    const fetchMetrics = async() => {
        const res = await getSalesMetrics();
        if(res.error) return toastError(res.message);
        setData(res.data);
    }
    useEffect(()=>{
        fetchMetrics();
    }, [])
    useEffect(()=>{
        
    }, [dateRange])
    if(!data) return <></>
    return(
        <>
            <Header title="Sales Report" Icon={PointOfSaleOutlinedIcon} />
            <Main className="">
                <div className="flex w-full space-x-4">
                    <div className="flex-1 flex p-6 flex-col bg-white-100 rounded-md">
                        <div>
                            <h1 className="font-semibold text-2xl text-gray-700">Revenues</h1>
                        </div>
                        <div className="flex flex-col space-y-4">
                            <div className="text-gray-400 w-full text-center py-2 font-semibold">Total Metrics</div>
                            <MetricItem label = "Total Revenue" value={"Rs " +data.total_revenue}  />
                            <MetricItem label = "Total revenue made today" value={"Rs " +data.total_revenue_today}  />
                            <MetricItem label = "Total revenue made this month" value={"Rs " +data.total_revenue_current_month}  />
                            <MetricItem label = "Total revenue made this year" value={"Rs " +data.total_revenue_current_year}  />
                            <div className="text-gray-400 w-full text-center py-2 font-semibold">Average Metrics</div>
                            <MetricItem label = "Average revenue" value={"Rs " +data.average_revenue}  />
                            <MetricItem label = "Revenue per day" value={"Rs " +data.revenue_per_day}  />
                            <MetricItem label = "Revenue per month" value={"Rs " +data.revenue_per_month}  />
                            <MetricItem label = "Revenue per year" value={"Rs " +data.revenue_per_year}  />
                        </div>
                    </div> 
                    <div className="flex-1 flex p-6 flex-col bg-white-100 rounded-md">
                        <div className="flex">
                            <h1 className="font-semibold text-2xl text-gray-700">Revenue Growth Chart</h1>
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