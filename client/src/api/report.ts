import { ReportByDateT, ReportStatsT } from "@shared/Report"
import axios from "./axios"
export const getSalesReport = async(date_type: ReportByDateT) => {
    const res = await axios.get("/api/reports/sales", {params: {date_type}});
    return res.data as ApiResponse<ReportStatsT[]>;
}