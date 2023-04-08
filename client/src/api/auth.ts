import axios from "./axios"
import { AdminT } from "@shared/Admin";
export const adminLogin = async(data: {email: string, password: string}) => {
    const res = await axios.post("/api/auth/login", data);
    return res.data as ApiResponse<AdminT>;
}