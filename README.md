# PokemonTeamGenerator

A script to output the optimal team given a list of opponents pokemon

# How to run
 - Install dependencies | npm install
 - Run test suite | npm t


# Assumptions
- The script will be provided with an array of pokemon names
- The returned result will be an array of 6 types not specific pokemon

# Plan

- Create a function which accepts an array of strings (pokemon names)
- Validate input is an array of length 6
- Make a GET request to https://pokeapi.co/api/v2/pokemon/{name}/ for all pokemon
- Build an array of all types
- Get all types data from https://pokeapi.co/api/v2/type/{type}
- Build a unified array of objects out of the data for example:
```json
{
    "name": "charizard",
    "total_base_stats": 1000,
    "damage_relations": {
        "double_damage_from": [
            {
                "name": "ground",
                "url": "https://pokeapi.co/api/v2/type/5/"
            },
            {
                "name": "rock",
                "url": "https://pokeapi.co/api/v2/type/6/"
            },
            {
                "name": "water",
                "url": "https://pokeapi.co/api/v2/type/11/"
            }
        ],
        "double_damage_to": [
            {
                "name": "bug",
                "url": "https://pokeapi.co/api/v2/type/7/"
            },
            {
                "name": "steel",
                "url": "https://pokeapi.co/api/v2/type/9/"
            },
            {
                "name": "grass",
                "url": "https://pokeapi.co/api/v2/type/12/"
            },
            {
                "name": "ice",
                "url": "https://pokeapi.co/api/v2/type/15/"
            }
        ],
        "half_damage_from": [
            {
                "name": "bug",
                "url": "https://pokeapi.co/api/v2/type/7/"
            },
            {
                "name": "steel",
                "url": "https://pokeapi.co/api/v2/type/9/"
            },
            {
                "name": "fire",
                "url": "https://pokeapi.co/api/v2/type/10/"
            },
            {
                "name": "grass",
                "url": "https://pokeapi.co/api/v2/type/12/"
            },
            {
                "name": "ice",
                "url": "https://pokeapi.co/api/v2/type/15/"
            },
            {
                "name": "fairy",
                "url": "https://pokeapi.co/api/v2/type/18/"
            }
        ],
        "half_damage_to": [
            {
                "name": "rock",
                "url": "https://pokeapi.co/api/v2/type/6/"
            },
            {
                "name": "fire",
                "url": "https://pokeapi.co/api/v2/type/10/"
            },
            {
                "name": "water",
                "url": "https://pokeapi.co/api/v2/type/11/"
            },
            {
                "name": "dragon",
                "url": "https://pokeapi.co/api/v2/type/16/"
            }
        ],
        "no_damage_from": [],
        "no_damage_to": []
    },
}
```
- Loop through the array and return the best possible opponent type based on damage multiplier
- Return a array of the best pokemon team to face the opponents pokemon