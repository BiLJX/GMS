import { createMembershipType } from "../controllers/membershipTypeController";
import { Router } from "express";

const router = Router();

router.post("/create", createMembershipType);

export { router as membershipTypeRoutes }