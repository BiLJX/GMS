import { adminLogin } from "../controllers/authController";
import { Router } from "express";

const router = Router();

router.post("/login", adminLogin);

export { router as authRoutes }