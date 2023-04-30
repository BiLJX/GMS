import { Gender } from "@shared/Member"
import { AddonT } from "./Addon";
import { MembershipTypeT } from "./MembershipTypes";
export interface CreateMembershipTypeDataT {
    membership_name: string,
    period: number|null,
    description: string,
    price: number|null,
    registration_fee: number|null
}

export interface AddAddonsDataT {
    addon_name: string,
    price: number|null;
}

export interface CreateMemberDataT {
    full_name: string,
    email: string,
    address: string,
    DOB: Date|null,
    contact_no: number|null,
    profile_pic_url: string,
    membership_type: MembershipTypeT|null,
    gender: Gender|null,
    weight: number|null,
    height: number|null,
    addons: AddonT[],
    discount: number
}