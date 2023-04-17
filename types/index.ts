export interface DamageRelation {
    name: string,
    url: string
}

export interface DamageRelations {
    double_damage_from: DamageRelation[]
    double_damage_to: DamageRelation[]
    half_damage_from: DamageRelation[]
    half_damage_to: DamageRelation[]
    no_damage_from: DamageRelation[]
    no_damage_to: DamageRelation[]
}

export interface FormattedPokemon {
    name: string
    total_base_stats: number
    damage_relations: DamageRelations[]
}
