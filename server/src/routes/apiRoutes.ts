import { Router } from "express";
import { authRoutes } from "./authRoutes";
import { adminAuthMid } from "../middleware/adminAuthMid";
import { adminRoutes } from "./adminRoutes";
import { membershipTypeRoutes } from "./membershipTypesRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/admin", adminAuthMid, adminRoutes);
router.use("/membership", adminAuthMid, membershipTypeRoutes)
export { router as ApiRoutes }