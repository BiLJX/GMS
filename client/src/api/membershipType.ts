import { CreateMembershipTypeDataT } from "@shared/Api";
import axios from "./axios";
import { MembershipTypeT } from "@shared/MembershipTypes"
export const createMembershipType = async(data: CreateMembershipTypeDataT) => {
    const res = await axios.post("/api/membership/create", data);
    return res.data as ApiResponse<MembershipTypeT>;
}