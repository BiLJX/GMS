export type Gender = "Male"|"Female"|"Others";
export type MemberShipStatus = "Active"|"Expired";
export interface MemberT {
    member_id: string,
    gym_id: string,
    name: string,
    email: string,
    address: string,
    DOB: Date,
    contact_no: number,
    profile_pic_url: string,
    membership_type_id: string,
    gender: Gender,
    joined_date: Date,
    renew_date: Date,
    expire_date: Date,
    status: MemberShipStatus
}