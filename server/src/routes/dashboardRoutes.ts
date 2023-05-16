import { getDashboardStats } from "@controllers/dashboardController";
import { Router } from "express";

const router = Router();

router.get("/", getDashboardStats);

export  {router as dashboardRoutes};