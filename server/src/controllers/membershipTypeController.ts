import { Controller } from "../types/controller";
import JsonResponse from "../utils/Response";
import { CreateMembershipTypeDataT } from "@shared/Api"
import { AdminT } from "@shared/Admin";
import { MembershipType } from "../models/MembershipType";
import { makeId } from "../utils/idgen";
export const createMembershipType: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    try {
        const admin: AdminT = res.locals.admin;
        const data = req.body as CreateMembershipTypeDataT;
        if(!data.membership_name) return jsonResponse.clientError("Please enter a membership name");
        if(!data.period) return jsonResponse.clientError("Please enter a period");
        if(data.price === null) return jsonResponse.clientError("Please enter a price");
        if(!data.description) return jsonResponse.clientError("Please enter a description")
        const membershipType = new MembershipType({
            membership_type_id: makeId(),
            gym_id: admin.gym_id,
            membership_name: data.membership_name,
            description: data.description,
            period: data.period,
            price: data.price
        })
        await membershipType.save();
        jsonResponse.success(membershipType);
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}