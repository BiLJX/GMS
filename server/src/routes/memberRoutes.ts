import { createMember, getMembers } from "@controllers/memberController";
import { Router } from "express";

const router = Router();


router.post("/create", createMember);
router.get("/", getMembers);
export { router as memberRoutes };