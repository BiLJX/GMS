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