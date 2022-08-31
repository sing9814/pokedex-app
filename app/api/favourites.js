import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getAllFavouritesAPI() {
    try {
        const response = await AsyncStorage.getItem('favourites');
        return (response !== null) ? JSON.parse(response) : [];
    } catch (error) {
        console.error(error)
    }
}

export async function setFavouritesAPI(id) {
    try {
        const favourites = await getAllFavouritesAPI()
        favourites.push(id)
        AsyncStorage.setItem('favourites', JSON.stringify(favourites))
    } catch (error) {
        console.error(error)
    }
}

export async function removeFavouritesAPI(id) {
    const data = await getAllFavouritesAPI()
    const alteredData = data.filter(function (e) {
        return e !== id
    })
    AsyncStorage.setItem('favourites', JSON.stringify(alteredData));
}

export async function removeAllFavourites() {
    try {
        await AsyncStorage.removeItem('favourites')
    } catch (e) {
        console.error(error)
    }
}

export async function isPokemonFavourite(id) {
    const favourites = await getAllFavouritesAPI()
    for (let i = 0; i < favourites.length; i++) {

        if (id === favourites[i]) {
            return true
        }
    }
    return false
}


