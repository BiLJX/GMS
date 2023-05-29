import axios from "./axios"

export const updateWeight = async(user_id: string, weight: number) => {
    const res = await axios.put("/api/members/weight/update/"+user_id, {weight});
    return res.data as ApiResponse;
}