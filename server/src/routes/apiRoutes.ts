import { Router } from "express";
import { authRoutes } from "./authRoutes";
import { adminAuthMid } from "../middleware/adminAuthMid";
import { adminRoutes } from "./adminRoutes";
import { membershipTypeRoutes } from "./membershipTypesRoutes";
import { addonRoutes } from "./addonRoutes";


const router = Router();

router.use("/auth", authRoutes);
router.use("/admin", adminAuthMid, adminRoutes);
router.use("/membership", adminAuthMid, membershipTypeRoutes)
router.use("/addons", adminAuthMid, addonRoutes)
export { router as ApiRoutes }