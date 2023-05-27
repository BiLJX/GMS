import { Member } from "models/Member";
import { MemberWeight } from "models/MemberWeight";
import moment from "moment";
import { Controller } from "types/controller";
import JsonResponse from "utils/Response";

export const updateMemberWeight: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    try {
        const { gym_id } = res.locals.admin;
        const { id } = req.params;
        const member = await Member.findOne({member_id: id});
        if(!member) return jsonResponse.clientError("Member not found");
        const { weight } = req.body;
        if(!weight) return jsonResponse.clientError("Please input a weight");
        
        const member_weight = new MemberWeight({
            gym_id,
            member_id: id,
            weight,
        })

        const prevWeight = (await MemberWeight.find({member_id: id}).sort({createdAt: -1}))[0];
        if(!prevWeight) {
            await member_weight.save();
            return jsonResponse.success("Successfully updated member's weight");
        }
        const diff = moment(new Date()).diff(prevWeight.createdAt)
        if(Math.abs(diff) < 7) return jsonResponse.clientError("You can only update Weight in each week.")
        await member_weight.save();
        jsonResponse.success("Successfully updated member's weight");
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}