export interface MemberWeightT {
    member_weight_id: string,
    member_id: string,
    gym_id: string,
    weight: number,
    createdAt: Date
}

export interface WeightStatsT {
    value: number,
    date: string
}