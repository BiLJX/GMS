import { getMembersReport, getSales } from "@controllers/reportController";
import { Router } from "express";

const router = Router();

router.get("/sales", getSales);
router.get("/members", getMembersReport);
export { router as reportRoutes }