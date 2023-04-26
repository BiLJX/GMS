export interface MembershipStatusT {
    membership_status_id: string,
    gym_id: string,
    member_id: string,
    membership_id: string,
    addon: string[],
    renew_date: Date,
    expire_date: Date
}