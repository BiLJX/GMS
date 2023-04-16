import { createMembershipType, deleteMembershipTypes, editMembershipType, getMembershipTypeById, getMembershipTypes } from "../controllers/membershipTypeController";
import { Router } from "express";

const router = Router();

router.get("/", getMembershipTypes);
router.get("/:id", getMembershipTypeById)
router.post("/create", createMembershipType);
router.patch("/edit", editMembershipType);
router.delete("/delete/:id", deleteMembershipTypes);

export { router as membershipTypeRoutes }