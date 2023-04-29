export type Gender = "Male"|"Female"|"Others";
export type MembershipStatusType = "Active"|"Expired";
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
    weight: number,
    height: number
    status: MembershipStatusType
}