import { AdminT } from "@shared/Admin";
import axios from "./axios"

export const getCurrentAdmin = async() => {
    const res = await axios.get("/api/admin/current");
    return res.data as ApiResponse<AdminT|null>;
}
//asd