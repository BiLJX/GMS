export interface CreateMembershipTypeDataT {
    membership_name: string,
    period: number|null,
    description: string,
    price: number|null,
    registration_fee: number|null
}