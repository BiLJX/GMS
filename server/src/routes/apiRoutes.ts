import { Router } from "express";
import { authRoutes } from "./authRoutes";
import { adminAuthMid } from "../middleware/adminAuthMid";
import { adminRoutes } from "./adminRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/admin", adminAuthMid, adminRoutes);
export { router as ApiRoutes }