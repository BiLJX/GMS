import { getCurrentAdmin } from "../controllers/adminController";
import { Router } from "express";

const router = Router();

router.get("/current", getCurrentAdmin);

export { router as adminRoutes }
