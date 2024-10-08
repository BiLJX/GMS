import { AdminT } from "@shared/Admin";
import { CreateMemberDataT, EditMemberDataT, MemberResponseT } from "@shared/Api";
import { MemberT } from "@shared/Member";
import { Addon } from "models/Addon";
import { Member } from "models/Member";
import { MembershipStatus } from "models/MembershipStatus";
import { MembershipType } from "models/MembershipType";
import { Sales } from "models/Sales";
import moment from "moment";
import sharp from "sharp";
import { Controller } from "types/controller";
import JsonResponse from "utils/Response";
import { makeId } from "utils/idgen";
import { upload, uploadFile } from "utils/upload";

export const createMember: Controller = async(req, res) => {
    const { gym_id } = res.locals.admin as AdminT;
    const jsonResponse = new JsonResponse(res);
        try {
            const client_data: CreateMemberDataT = req.body;
            const member_id = makeId();
            
            if(!client_data.full_name) return jsonResponse.clientError("Please enter a name");
            if(!client_data.address) return jsonResponse.clientError("Please enter a address");
            if(!client_data.email) return jsonResponse.clientError("Please enter email");
            if(!(client_data.contact_no && client_data.contact_no.toString().length === 10)) return jsonResponse.clientError("Please enter a valid contact number");
            if(!client_data.membership_type?.membership_type_id) return jsonResponse.clientError("Please enter a membership type");
            if(!(client_data.gender === "Male" || client_data.gender === "Female" || client_data.gender === "Others")) return jsonResponse.clientError("Please enter correct gender");
            if(!client_data.weight) return jsonResponse.clientError("Please enter a weight");
            if(!client_data.height) return jsonResponse.clientError("Please enter height");
            if(!client_data.DOB) return jsonResponse.clientError("Please enter a DOB")

            const membership_type = await MembershipType.findOne({gym_id, membership_type_id: client_data.membership_type.membership_type_id});
            if(!membership_type) return jsonResponse.clientError("Invalid Membership Type");
    
            const addon_ids = client_data.addons?.map(x=>x.addon_id) || [];
            const addons = await Addon.find({gym_id, addon_id: {$in: addon_ids }});
            if(addons.length !== addon_ids.length) return jsonResponse.clientError("One of the addon you added is invalid")
    
            const membership_price = membership_type.price;
            const registration_fee = membership_type.registration_fee;
            const addons_price = addons.reduce((prev, x)=>prev + x.price, 0)
            const discount_percentage = client_data.discount;
            const sub_total = membership_price + addons_price + registration_fee;
            const total = sub_total - ((discount_percentage/100) * sub_total);
            
            const sale = new Sales({
                sale_id: makeId(),
                gym_id,
                membership_type_id: membership_type.membership_type_id,
                discount_percentage: client_data.discount,
                sub_total,
                total
            })

            const member = new Member({
                member_id,
                gym_id,
                full_name: client_data.full_name,
                address: client_data.address,
                contact_no: client_data.contact_no,
                DOB: client_data.DOB,
                email: client_data.email,
                gender: client_data.gender,
                height: client_data.height,
                addon_ids: addons.map(x=>x.addon_id),
                joined_date: new Date(),
                membership_type_id: membership_type.membership_type_id,
                weight: client_data.weight,
            })
            const expire_date: Date = moment().add(membership_type.period, "days").toDate();
            const membership_status = new MembershipStatus({
                member_id,
                gym_id,
                membership_status_id: makeId(),
                renew_date: new Date(),
                expire_date
            })
            await Promise.all([member.save(), sale.save(), membership_status.save()]);
            const _member = member.toJSON();
            _member.membership_status = membership_status.toJSON();
            _member.membership_status.status = "Active";
            jsonResponse.success(_member);
        } catch (error) {
            console.log(error);
            jsonResponse.serverError();
        }
}

export const getMembers: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    const { gym_id } = res.locals.admin as AdminT;
    try {
        const search_name = req.query.search_name;
        let members = await Member.aggregate<MemberT>([
            {
                $match: {
                    gym_id,
                    full_name: {$regex: search_name, $options: "i"}
                }
            },
            {
                $lookup: {
                    from: "membership_statuses",
                    localField: "member_id",
                    foreignField: "member_id",
                    as: "membership_status",
                }
            },
            {
                $unwind: "$membership_status"
            }
        ])
        members = members.map(x=>{
            x.membership_status.status = moment(new Date()).isAfter(x.membership_status.expire_date)?"Expired":"Active";
            return x;
        })
        jsonResponse.success(members);
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}

export const editMember: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    try {
        const member_id = req.params.id;
        const client_data: EditMemberDataT = req.body;
        const gym_id = res.locals.admin.gym_id;
        if(!client_data.full_name) return jsonResponse.clientError("Please enter a name");
        if(!client_data.address) return jsonResponse.clientError("Please enter a address");
        if(!client_data.email) return jsonResponse.clientError("Please enter email");
        if(!(client_data.contact_no && client_data.contact_no.toString().length === 10)) return jsonResponse.clientError("Please enter a valid contact number");
        if(!(client_data.gender === "Male" || client_data.gender === "Female" || client_data.gender === "Others")) return jsonResponse.clientError("Please enter correct gender");
        if(!client_data.height) return jsonResponse.clientError("Please enter height");
        if(!client_data.DOB) return jsonResponse.clientError("Please enter a DOB");

        const result = await Member.findOneAndUpdate({member_id, gym_id}, {
            $set: {
                full_name: client_data.full_name,
                address: client_data.address,
                contact_no: client_data.contact_no,
                DOB: client_data.DOB,
                email: client_data.email,
                gender: client_data.gender,
                height: client_data.height,
            }
        })

        if(!result) return jsonResponse.clientError("Something went wrong");
        jsonResponse.success(result.toJSON());
        
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}

export const getMemberById: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    try {
        const { gym_id } = res.locals.admin;
        const member_id = req.params.id;
        const members = await Member.aggregate<MemberResponseT>([
            {
                $match: {
                    gym_id,
                    member_id
                }
            },
            {
                $lookup: {
                    from: "membership_statuses",
                    localField: "member_id",
                    foreignField: "member_id",
                    as: "membership_status",
                }
            },
            {
                $lookup: {
                    from: "membership_types",
                    localField: "membership_type_id",
                    foreignField: "membership_type_id",
                    as: "membership"
                }
            },
            {
                $lookup: {
                    from: "addons",
                    localField: "addon_ids",
                    foreignField: "addon_id",
                    as: "addons"
                }
            },
            {
                $unwind: "$membership_status"
            },
            {
                $unwind: {
                    path: "$membership",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $addFields: { 
                    age: { $dateDiff: { startDate: "$DOB", endDate: "$$NOW", unit: "year" } },
                    total_days: {$dateDiff: {startDate: "$membership_status.renew_date", endDate: "$membership_status.expire_date", unit: "day"}}, 
                    remaining_days: {$dateDiff: {startDate: "$$NOW", endDate: "$membership_status.expire_date", unit: "day"}}
                }
            }
        ])
        const member = members[0];
        if(!member) return jsonResponse.notFound("Member not found");
        member.membership_status.status = moment(new Date()).isAfter(member.membership_status.expire_date)?"Expired":"Active";
        if(member.membership_status.status === "Expired") member.remaining_days = 0;
        jsonResponse.success(member);   

    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}

export const deleteMember: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    const gym_id = res.locals.admin.gym_id;
    try {
        const member_id = req.params.id;
        await Member.findOneAndDelete({member_id, gym_id});
        await MembershipStatus.findOneAndDelete({member_id, gym_id});
        jsonResponse.success("Member removed successfully");
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}

export const renewMemberShip: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    try {
        const { gym_id } = res.locals.admin;
        const member_id = req.params.id;

        const client_data: CreateMemberDataT & {renew_from: "today"|"expire"} = req.body;
        if(!client_data.membership_type?.membership_type_id) return jsonResponse.clientError("Please select a membership type");
        
        const member = (await Member.aggregate<MemberT>([
            {
                $match: {
                    member_id,
                    gym_id
                }
            },
            {
                $lookup: {
                    from: "membership_statuses",
                    localField: "member_id",
                    foreignField: "member_id",
                    as: "membership_status",
                }
            },
            {
                $unwind: "$membership_status"
            }
        ]))[0]

        if(!member) return jsonResponse.clientError("Member not found");


        const prev_expire_date = member.membership_status.expire_date;
        const expire_status = moment(new Date()).isAfter(prev_expire_date)?"Expired":"Active";

        if(expire_status === "Active") return jsonResponse.clientError("The membership has not been expired");


        const membership_type = await MembershipType.findOne({gym_id, membership_type_id: client_data.membership_type.membership_type_id});
        if(!membership_type) return jsonResponse.clientError("Invalid Membership Type");
        
        const addon_ids = client_data.addons?.map(x=>x.addon_id) || [];
        const addons = await Addon.find({gym_id, addon_id: {$in: addon_ids }});
        if(addons.length !== addon_ids.length) return jsonResponse.clientError("One of the addon you added is invalid")
        
        let expire_date: Date =  moment().add(membership_type.period, "days").toDate();; 
        let renew_date: Date = new Date();
        if(client_data.renew_from === "expire") {
            expire_date = moment(member.membership_status.expire_date).add(membership_type.period, "days").toDate();
            renew_date = member.membership_status.expire_date
        }
        

        const membership_price = membership_type.price;
        const addons_price = addons.reduce((prev, x)=>prev + x.price, 0)
        const discount_percentage = client_data.discount || 0;
        const sub_total = membership_price + addons_price;
        const total = sub_total - ((discount_percentage/100) * sub_total);



        const sale = new Sales({
            gym_id,
            sale_id: makeId(),
            membership_type_id: client_data.membership_type,
            discount_percentage,
            sub_total,
            total
        })
        await sale.validate();
        
        await Member.findOneAndUpdate({member_id, gym_id}, {
            $set: {
                membership_type_id: membership_type.membership_type_id,
                addon_ids: addons.map(x=>x.toJSON().addon_id)
            }
        })

        await MembershipStatus.findOneAndUpdate({member_id, gym_id}, {
            $set: {
                expire_date,
                renew_date
            }
        })
        
        await sale.save();
        jsonResponse.success();
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}

export const cancelMembership: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    try {
        const { gym_id } = res.locals.admin;
        const member_id = req.params.id;
        await MembershipStatus.findOneAndUpdate({gym_id,member_id}, {
            $set: {
                expire_date: new Date()
            }
        })
        jsonResponse.success("Successfully canceled membership")
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}