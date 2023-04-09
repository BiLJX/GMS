import { createMembershipType, getMembershipTypes } from "../controllers/membershipTypeController";
import { Router } from "express";

const router = Router();

router.get("/", getMembershipTypes);
router.post("/create", createMembershipType);

export { router as membershipTypeRoutes }