import { addAddons, deleteAddon, editAddon, getAddonById, getAddons } from "@controllers/addonController";
import { Router } from "express";

const router = Router();

router.post("/add", addAddons);
router.get("/", getAddons);
router.get("/:id", getAddonById);
router.patch("/edit", editAddon);
router.delete("/delete/:id", deleteAddon)
export { router as addonRoutes }