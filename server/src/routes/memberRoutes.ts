import { cancelMembership, createMember, deleteMember, editMember, getMemberById, getMembers, renewMemberShip } from "@controllers/memberController";
import { updateMemberWeight } from "@controllers/weightController";
import { Router } from "express";

const router = Router();


router.post("/create", createMember);
router.get("/", getMembers);
router.get("/:id", getMemberById);
router.patch("/edit/:id", editMember);

router.put("/renew/:id", renewMemberShip);
router.put("/cancel/:id", cancelMembership);

router.put("/weight/update/:id", updateMemberWeight);

router.delete("/remove/:id", deleteMember);

export { router as memberRoutes };