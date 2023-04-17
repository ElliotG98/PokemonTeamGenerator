import { FormattedPokemon } from "../types"
import AxiosClient from "./lib/axiosClient"

const basePokemonApiUrl = 'https://pokeapi.co/api/v2/'
const axiosClient = new AxiosClient(basePokemonApiUrl)

const types = ['normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy', 'unknown', 'shadow']

const getBestTypeToFace = (pokemon: FormattedPokemon): string => {
    const immuneTypes = []
    const effectiveTypes: Record<string, number> = {}

    for (const type of types) {
        if (immuneTypes.length) break;
        for (const damage_relation of pokemon.damage_relations) {
            if (damage_relation.no_damage_to.some(relation => relation.name === type)) {
                immuneTypes.push(type)
            } else {
                //If double damage from type && half damage to type  === super effective
                if (damage_relation.double_damage_from.some(relation => relation.name === type) && damage_relation.half_damage_to.some(relation => relation.name === type)) {
                    effectiveTypes[type] = 2
                }
                //if double damage from type || half damage to type === effective
                else if (damage_relation.double_damage_from.some(relation => relation.name === type) || damage_relation.half_damage_to.some(relation => relation.name === type)) {
                    effectiveTypes[type] = 1
                }
            }
        }
    }

    if (immuneTypes.length) return immuneTypes[0];

    const sortedEffectiveTypes = Object.entries(effectiveTypes).sort((a, b) => b[1] - a[1])

    if (!sortedEffectiveTypes.length) return pokemon.name

    return sortedEffectiveTypes[0][0]
}

const getBestTypes = (pokemon: FormattedPokemon[]) => {
    return pokemon.map(pokemonData => {
        const bestType = getBestTypeToFace(pokemonData)

        return {
            name: pokemonData.name,
            bestType
        }
    })
}

const getBestPokemon = async (bestPokemonTypes: Record<string, string>[]) => {
    return Promise.all(bestPokemonTypes.map(async pokemonType => {
        const pokemonTypeData: any = await getPokemonType(pokemonType.bestType)
        const pokemon = pokemonTypeData?.pokemon[0]?.pokemon?.name
        return pokemon
    }))
}

const formatData = async (pokemon: string[]): Promise<FormattedPokemon[]> => {
    const unifiedOpponentPokemonPromises = pokemon.map(async pokemon => {
        const pokemonData: any = await getPokemon(pokemon)
        const total_base_stats: number = pokemonData?.stats.reduce((acc: number, curr: any) => acc + curr?.base_stat, 0)
        const types = pokemonData?.types.map((type: any) => type?.type?.name)
        const pokemonTypeData: any = await Promise.all(types.map(async (type: string) => getPokemonType(type)))
        const damage_relations = pokemonTypeData.map((typeData: any) => typeData?.damage_relations)

        return {
            name: pokemon,
            types,
            total_base_stats,
            damage_relations
        }
    })

    return Promise.all(unifiedOpponentPokemonPromises)
}

//https://pokeapi.co/api/v2/type/{type}
const getPokemonType = (type: string) => axiosClient.get(`/type/${type}`);

//https://pokeapi.co/api/v2/pokemon/{name}
const getPokemon = async (pokemon: string) => axiosClient.get(`/pokemon/${pokemon}`);


const validateInput = (pokemon: string[]) => {
    if (pokemon.length !== 6) throw new Error('Not enough pokemon provided as input')
}

export const getBestPokemonTeam = async (opponentPokemon: string[]) => {
    try {
        validateInput(opponentPokemon)

        const formattedData = await formatData(opponentPokemon)

        const bestPokemonTypes = getBestTypes(formattedData)

        console.log(bestPokemonTypes)

        return getBestPokemon(bestPokemonTypes)
    } catch (e) {
        if (e instanceof Error) {
            return e.message;
        }
    }
}