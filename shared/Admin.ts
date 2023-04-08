import { GymT } from "./Gym";
export interface AdminT {
    admin_id: string,
    gym_id: string,
    name: string,
    email: string,
    password: string,
    gym_data: GymT,
    profile_pic_url: string
}