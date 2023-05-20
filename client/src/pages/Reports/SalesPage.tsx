import Header from "components/Header/Header";
import PointOfSaleOutlinedIcon from '@mui/icons-material/PointOfSaleOutlined';
import Main from "components/Container/Main";
import { useState, useEffect } from "react"
import { ReportByDateT, ReportStatsT } from "@shared/Report";
import { getSalesReport } from "api/report";
import { toastError } from "components/Toast/toast";
import { LineChartReport } from "./LineChartReport";

export default function SalesPage(){
    const [dateType, setDateType] = useState<ReportByDateT>("daily");
    const [data, setData] = useState<ReportStatsT[]>([])
    const fetchData = async() => {
        const res = await getSalesReport(dateType);
        if(res.error) return toastError(res.message);
        setData(res.data);
    }
    useEffect(()=>{
        fetchData();
    }, [dateType])
    return(
        <>
            <Header title="Sales Report" Icon={PointOfSaleOutlinedIcon} />
            <Main>
                <div className="h-[85vh] w-full bg-white-100 rounded-lg flex flex-col space-y-8 p-4">
                    <div className="text-gray-700 font-medium">Sales Chart</div>
                    <div className="flex-1">
                        <LineChartReport data={data} />
                    </div>
                </div>
            </Main>
        </>
    )
}