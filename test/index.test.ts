import { getBestPokemonTeam } from '../src'

describe('get the best pokemon to face off against', () => {

    test('opponents pokemon not equal to a team of 6', async () => {
        const notATeamOf6 = [
            'bulbasaur',
            'ivysaur',
            'venusaur',
            'charmander',
            'charmeleon'
        ]
        expect(await getBestPokemonTeam(notATeamOf6)).toEqual('Not enough pokemon provided as input');
    })

    test('Returning the best types', async () => {
        const opponentPokemon = [
            'bulbasaur',
            'ivysaur',
            'venusaur',
            'charmander',
            'charmeleon',
            'charizard'
        ]
        await getBestPokemonTeam(opponentPokemon)
    })
})



