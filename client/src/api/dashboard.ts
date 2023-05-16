import axios from "./axios";
import { DashboardStatsT } from "@shared/Dashboard";
export const getDashboardStats = async() => {
    const res = await axios.get("/api/dashboard");
    return res.data as ApiResponse<DashboardStatsT>;
}