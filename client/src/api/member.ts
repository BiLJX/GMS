import { CreateMemberDataT } from "@shared/Api";
import axios from "./axios";
import { MemberT } from "@shared/Member";

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