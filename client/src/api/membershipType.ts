import { CreateMembershipTypeDataT } from "@shared/Api";
import axios from "./axios";
import { MembershipTypeT } from "@shared/MembershipTypes";

export const getMembershipTypeList = async(search_name: string) => {
    const res = await axios.get("/api/membership", {
        params: {search_name}
    })
    return res.data as ApiResponse<MembershipTypeT[]>;
}

export const getMembershipTypeById = async(id: string) => {
    const res = await axios.get("/api/membership/"+id);
    return res.data as ApiResponse<MembershipTypeT>;
}

export const createMembershipType = async(data: CreateMembershipTypeDataT) => {
    const res = await axios.post("/api/membership/create", data);
    return res.data as ApiResponse<MembershipTypeT>;
}

export const editMembershipType = async(data: CreateMembershipTypeDataT & {membership_type_id: string}) => {
    const res = await axios.patch("/api/membership/edit", data);
    return res.data as ApiResponse<MembershipTypeT>
}

export const deleteMembershipTypes = async(id: string) => {
    const res = await axios.delete("/api/membership/delete/"+id);
    return res.data as ApiResponse;
}