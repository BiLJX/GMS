import { Gender, MembershipStatusType } from "@shared/Member"
import { AddonT } from "./Addon";
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
    membership_type_id: string,
    gender: Gender|null,
    weight: number|null,
    height: number|null,
    addons: AddonT[],
    discount: number
}