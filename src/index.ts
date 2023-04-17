import AxiosClient from "./lib/axiosClient"

const basePokemonApiUrl = 'https://pokeapi.co/api/v2/'
const axiosClient = new AxiosClient(basePokemonApiUrl)

const formatData = async (pokemon: string[]) => {
    const unifiedOpponentPokemonPromises = pokemon.map(async pokemon => {
        const pokemonData: any = await getPokemon(pokemon)
        const total_base_stats: number = pokemonData?.stats.reduce((acc: number, curr: any) => acc + curr?.base_stat, 0)
        const types = pokemonData?.types.map((type: any) => type?.type?.name)
        const pokemonTypeData: any = await Promise.all(types.map(async (type: string) => getPokemonType(type)))
        const damage_relations = pokemonTypeData.map((typeData: any) => typeData?.damage_relations)

        return {
            name: pokemon,
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

        console.log(formattedData)

    } catch (e) {
        console.error(e)
        if (e instanceof Error) {
            return e.message;
        }
    }
}