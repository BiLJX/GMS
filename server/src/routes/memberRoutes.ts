import { cancelMembership, createMember, deleteMember, editMember, getMemberById, getMembers, renewMemberShip } from "@controllers/memberController";
import { getMemberWeight, updateMemberWeight } from "@controllers/weightController";
import { Router } from "express";

const router = Router();

router.get("/", getMembers);
router.get("/:id", getMemberById);
router.get("/weight/:id", getMemberWeight);

router.post("/create", createMember);

router.patch("/edit/:id", editMember);

router.put("/renew/:id", renewMemberShip);
router.put("/cancel/:id", cancelMembership);

router.put("/weight/update/:id", updateMemberWeight);

router.delete("/remove/:id", deleteMember);

export { router as memberRoutes };