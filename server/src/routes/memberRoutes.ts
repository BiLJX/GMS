import { createMember, deleteMember, editMember, getMemberById, getMembers } from "@controllers/memberController";
import { Router } from "express";

const router = Router();


router.post("/create", createMember);
router.get("/", getMembers);
router.get("/:id", getMemberById);
router.patch("/edit/:id", editMember);
router.delete("/remove/:id", deleteMember);

export { router as memberRoutes };