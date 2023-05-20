import Header from "components/Header/Header";
import PointOfSaleOutlinedIcon from '@mui/icons-material/PointOfSaleOutlined';
import Main from "components/Container/Main";
import { useState, useEffect } from "react"
import { ReportByDateT, ReportStatsT } from "@shared/Report";
import { getBreakdownReport, getSalesReport } from "api/report";
import { toastError } from "components/Toast/toast";
import { LineChartReport } from "./LineChartReport";
import { Select, MenuItem } from "@mui/material";
import PieChartReport from "./PieChartReport";

export default function BreakdownReportPage(){
    const [data, setData] = useState<ReportStatsT[]>([])
    const fetchData = async() => {
        const res = await getBreakdownReport();
        if(res.error) return toastError(res.message);
        setData(res.data);
    }
    useEffect(()=>{
        fetchData();
    }, [])
    return(
        <>
            <Header title="Membership Breakdown" Icon={PointOfSaleOutlinedIcon} />
            <Main>
                <div className="min-h-[85vh] w-full bg-white-100 rounded-lg flex flex-col space-y-8 p-4">
                    <div className="flex justify-between items-center">
                        <div className="text-gray-700 font-medium">Sales Chart</div>
                    </div>
                    <div className="flex-1 px-[15rem]">
                        <PieChartReport data={data} />
                    </div>
                </div>
            </Main>
        </>
    )
}