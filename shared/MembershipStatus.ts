export type MembershipStatusString = "Active"|"Expired";

export interface MembershipStatusT {
    membership_status_id: string,
    gym_id: string,
    member_id: string,
    renew_date: Date,
    expire_date: Date,
    status: MembershipStatusString
}