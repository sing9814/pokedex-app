export async function getAllPokemonAPI() {
    try {
        let response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0/", {
            method: 'GET'
        })
        let result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}

export async function getAllPokemonDetailsAPI(url) {
    try {
        let response = await fetch(url, {
            method: 'GET'
        })
        let result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}

export async function getIDPokemonDetailsAPI(id) {
    try {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
            method: 'GET'
        })
        let result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}