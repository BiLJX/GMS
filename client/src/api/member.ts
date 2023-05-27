import { CreateMemberDataT, MemberResponseT } from "@shared/Api";
import axios from "./axios";
import { MemberT } from "@shared/Member";
import { EditMemberDataT } from "../../../shared/Api";

export const createMember = async(data: CreateMemberDataT, pfp_image?: File) => {
    const _data = {...data};
    _data.DOB = new Date(data.DOB as any);
    const res = await axios.post("/api/members/create", data);
    return res.data as ApiResponse<MemberT>;
}


export const getMembers = async(search_name: string = "") => {
    const res= await axios.get("/api/members", {params: {search_name}});
    return res.data as ApiResponse<MemberT[]>
}  
 
export const getMemberById = async(member_id: string) => {
    const res= await axios.get("/api/members/"+member_id);
    return res.data as ApiResponse<MemberResponseT>;
}  

export const renewMemberShip = async(member_id: string, data: CreateMemberDataT) => {
    const res = await axios.put("/api/members/renew/"+member_id, data);
    return res.data as ApiResponse<MemberT>;
}

export const editMember = async(member_id: string, data: EditMemberDataT) => {
    const res = await axios.patch("/api/members/edit/"+member_id, data);
    return res.data as ApiResponse<MemberT>;
}

export const cancelMembership = async(member_id: string) => {
    const res = await axios.put("/api/members/cancel/"+member_id);
    return res.data as ApiResponse<MemberT>;
}