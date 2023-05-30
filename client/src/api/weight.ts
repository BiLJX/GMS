import axios from "./axios";
import { WeightStatsT } from "@shared/Weight";
export const updateWeight = async(user_id: string, weight: number) => {
    const res = await axios.put("/api/members/weight/update/"+user_id, {weight});
    return res.data as ApiResponse;
}

export const getMemberWeight = async(user_id: string) => {
    const res = await axios.get("/api/members/weight/"+user_id);
    return res.data as ApiResponse<WeightStatsT[]>;
}