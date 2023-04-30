import { AdminT } from "@shared/Admin";
import { CreateMemberDataT } from "@shared/Api";
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

const createMember: Controller = async(req, res) => {
    const { gym_id } = res.locals.admin as AdminT;
    let pfp_url: string = "";
    upload(req, res, async(err)=>{
        const jsonResponse = new JsonResponse(res);
        if(err) return jsonResponse.serverError();
        try {
            const client_data: CreateMemberDataT = req.body;
            const files = req.files as Express.Multer.File[];
            const member_id = makeId();
            
            if(!client_data.full_name) return jsonResponse.clientError("Please enter a name");
            if(!client_data.address) return jsonResponse.clientError("Please enter a address");
            if(!client_data.email) return jsonResponse.clientError("Please enter email");
            if(!(client_data.contact_no && client_data.contact_no === 10)) return jsonResponse.clientError("Please enter a contact number");
            if(!client_data.membership_type?.membership_type_id) return jsonResponse.clientError("Please enter a membership type");
            if(!(client_data.gender === "Male" || client_data.gender === "Female" || client_data.gender === "Others")) return jsonResponse.clientError("Please enter correct gender");
            if(!client_data.weight) return jsonResponse.clientError("Please enter a weight");
            if(!client_data.height) return jsonResponse.clientError("Please enter height");
    
            const membership_type = await MembershipType.findOne({gym_id, membership_type_id: client_data.membership_type});
            if(!membership_type) return jsonResponse.clientError("Invalid Membership Type");
    
            const addon_ids = client_data.addons.map(x=>x.addon_id);
            const addons = await Addon.find({gym_id, addon_id: {$in: addon_ids }});
            if(addons.length !== addon_ids.length) return jsonResponse.clientError("One of the addon you added is invalid")
    
            const membership_price = membership_type.price;
            const addons_price = addons.reduce((prev, x)=>prev + x.price, 0)
            const discount_percentage = client_data.discount;
            const sub_total = membership_price + addons_price;
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
                joined_date: new Date(),
                membership_type_id: membership_type.membership_type_id,
                weight: client_data.weight
            })
            const expire_date: Date = moment().add(30, "days").toDate();
            const membership_status = new MembershipStatus({
                member_id,
                gym_id,
                membership_status_id: makeId(),
                renew_date: new Date(),
                expire_date
            })
            if(files && files[0]){
                const image= files[0];
                if(!image.mimetype.includes("image")) return jsonResponse.clientError("Invalid image type");
                const buffer = await sharp(image.buffer).jpeg({quality: 90}).toBuffer();
                member.profile_pic_url = await uploadFile({buffer, dir: `gym/${gym_id}/member/${member_id}/`})
            }
            await Promise.all([member.save(), sale.save(), membership_status.save()]);
            jsonResponse.success(member);
        } catch (error) {
            console.log(error);
            jsonResponse.serverError();
        }
    })
    
}