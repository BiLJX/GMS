import { ReportByDateT, ReportStatsT } from "@shared/Report";
import axios from "./axios";

export const getSalesReport = async(date_type: ReportByDateT) => {
    const res = await axios.get("/api/reports/sales", {params: {date_type}});
    return res.data as ApiResponse<ReportStatsT[]>;
}

export const getMembersReport = async(date_type: ReportByDateT) => {
    const res = await axios.get("/api/reports/members", {params: {date_type}});
    return res.data as ApiResponse<ReportStatsT[]>;
}

export const getBreakdownReport = async() => {
    const res = await axios.get("/api/reports/breakdown");
    return res.data as ApiResponse<ReportStatsT[]>;
}