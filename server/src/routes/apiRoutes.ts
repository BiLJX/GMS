import { Router } from "express";
import { authRoutes } from "./authRoutes";
import { adminAuthMid } from "../middleware/adminAuthMid";
import { adminRoutes } from "./adminRoutes";
import { membershipTypeRoutes } from "./membershipTypesRoutes";
import { addonRoutes } from "./addonRoutes";
import { memberRoutes } from "./memberRoutes";
import { dashboardRoutes } from "./dashboardRoutes";


const router = Router();

router.use("/auth", authRoutes);
router.use("/admin", adminAuthMid, adminRoutes);
router.use("/membership", adminAuthMid, membershipTypeRoutes);
router.use("/addons", adminAuthMid, addonRoutes);
router.use("/members", adminAuthMid, memberRoutes);
router.use("/dashboard", adminAuthMid, dashboardRoutes)

export { router as ApiRoutes }