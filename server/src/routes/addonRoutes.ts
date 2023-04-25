import { addAddons, getAddons } from "@controllers/addonController";
import { Router } from "express";

const router = Router();

router.post("/add", addAddons);
router.get("/", getAddons)

export { router as addonRoutes }