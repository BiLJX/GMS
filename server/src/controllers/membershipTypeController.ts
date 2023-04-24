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
            price: data.price,
            registration_fee: data.registration_fee || 0
        })
        await membershipType.save();
        jsonResponse.success(membershipType);
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}

export const getMembershipTypes: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    try {
        const gym_id = res.locals.admin.gym_id;
        const search_query = req.query.search_name || "";
        const membership_types = await MembershipType.aggregate([
            {
                $match: {
                    gym_id,
                    membership_name: {$regex: search_query, $options: "i"}
                }
            }
        ])
        jsonResponse.success(membership_types);
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}

export const getMembershipTypeById: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    try {
        const gym_id = res.locals.admin.gym_id;
        const membership_type_id = req.params.id;
        const membership_type = await MembershipType.findOne({gym_id, membership_type_id});
        if(!membership_type) return jsonResponse.clientError("Membership not found");
        jsonResponse.success(membership_type.toJSON());
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}

export const editMembershipType: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    try {
        const gym_id = res.locals.admin.gym_id;
        const admin: AdminT = res.locals.admin;
        const data = req.body as (CreateMembershipTypeDataT & {membership_type_id: string});
        const membership_type_id = data.membership_type_id;
        if(!data.membership_name) return jsonResponse.clientError("Please enter a membership name");
        if(!data.period) return jsonResponse.clientError("Please enter a period");
        if(data.price === null) return jsonResponse.clientError("Please enter a price");
        if(!data.description) return jsonResponse.clientError("Please enter a description")
        const membershipType = await MembershipType.findOneAndUpdate({membership_type_id, gym_id },{
            $set: {
                membership_type_id,
                gym_id: admin.gym_id,
                membership_name: data.membership_name,
                description: data.description,
                period: data.period,
                price: data.price,
                registration_fee: data.registration_fee || 0
            }
        })
        jsonResponse.success(membershipType);
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}

export const deleteMembershipTypes: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    try {
        const gym_id = res.locals.admin.gym_id;
        const membership_type_id = req.params.id;
        await MembershipType.deleteOne({membership_type_id, gym_id});
        jsonResponse.success({}, "Successfully deleted");
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}