import { getMemberGrowthChart, getMembersMetrics } from "@controllers/report/memberReportController";
import { getRevenueGrowthChart, getRevenueMetrics } from "@controllers/report/revenueController";
import { getBreakdownReport, getMembersReport, getSales } from "@controllers/reportController";
import { Router } from "express";

const router = Router();

router.get("/sales", getSales);
router.get("/sales/metrics", getRevenueMetrics);
router.get("/sales/chart", getRevenueGrowthChart);
router.get("/members", getMembersReport);
router.get("/members/metrics", getMembersMetrics);
router.get("/members/chart", getMemberGrowthChart);
router.get("/breakdown", getBreakdownReport);

export { router as reportRoutes }