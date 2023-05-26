import { AddonT } from "./Addon";
import { MembershipStatusT } from "./MembershipStatus";
import { MembershipTypeT } from "./MembershipTypes";

export type Gender = "Male"|"Female"|"Others";

export interface MemberT {
    member_id: string,
    gym_id: string,
    full_name: string,
    email: string,
    address: string,
    DOB: Date,
    contact_no: number,
    profile_pic_url: string,
    membership_type_id: string,
    gender: Gender,
    joined_date: Date,
    addon_ids: string[],
    weight: number,
    height: number
    membership_status: MembershipStatusT,
    memebrship: MembershipTypeT,
    addons: AddonT[]
    age: number,
}