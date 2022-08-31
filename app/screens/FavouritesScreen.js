import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, ActivityIndicator } from 'react-native';
import CustomButton from '../components/button';
import { AuthContext } from '../context/AuthContext';
import { getAllFavouritesAPI, removeAllFavourites } from '../api/favourites';
import { getIDPokemonDetailsAPI } from '../api/pokemon';
import { useNavigation } from '@react-navigation/native';
import PokemonList from '../components/PokemonList';

function FavouritesScreen() {
    const navigation = useNavigation();
    const { logout } = useContext(AuthContext)
    const [favourites, setFavourites] = useState({})
    const [isloading, setIsLoading] = useState()
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        getPokemon()
        setRefresh(false)
    }, [refresh])

    useEffect(() => {
        navigation.addListener('focus', async () => {
            getPokemon()
        })
    }, [])

    const removeFavourites = () => {
        removeAllFavourites()
        setRefresh(true)
    }

    const getPokemon = async () => {
        try {
            setIsLoading(true)
            const api = await getAllFavouritesAPI()
            const pokeDetailsData = await Promise.all(api.map(async (item) => {
                const pokemonDetails = await getIDPokemonDetailsAPI(item)
                return {
                    id: pokemonDetails.id,
                    name: pokemonDetails.name,
                    type: pokemonDetails.types,
                    img: pokemonDetails.sprites.other["official-artwork"].front_default,
                }
            }))
            setIsLoading(false)
            setFavourites(pokeDetailsData)
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Favourites</Text>
            {isloading ? (
                <ActivityIndicator color={"black"} size="large"></ActivityIndicator>
            ) :
                <>
                    {favourites.length > 0 ? (
                        <PokemonList data={favourites}></PokemonList>
                    ) : (
                        <>
                            <Text style={{ alignSelf: "center" }}>You have no favourite pokemon...</Text>
                            <Image style={styles.noFavouritesImage} source={{ uri: "https://media.discordapp.net/attachments/465293019751645187/1013913429104402432/unknown.png" }}></Image>
                        </>
                    )
                    }
                </>
            }
            <View style={{ height: 40, width: '100%' }}></View>

            <View style={styles.buttonContainer}>
                <CustomButton
                    text="Sign Out"
                    onPress={() => { logout() }}
                    backgroundColor="#F7D02C"></CustomButton>

                {favourites.length == 0 ? (
                    <>
                        <View></View>
                    </>
                ) : (
                    <CustomButton
                        text="Remove All"
                        onPress={() => { removeFavourites() }}
                        backgroundColor="#E2BF65"></CustomButton>
                )
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingTop: 20,
        width: "100%",
        height: "100%",
        paddingHorizontal: 10
    },
    title: {
        fontSize: 26,
        paddingBottom: 15,
        fontWeight: '800',
        padding: 10,
        alignSelf: 'center'
    },
    noFavouritesImage: {
        width: "80%",
        height: 200,
        alignSelf: "center",
        margin: 20
    },
    buttonContainer: {
        bottom: 50,
        width: "100%",
        backgroundColor: "#fff",
        paddingHorizontal: 20
    },
});

export default FavouritesScreen;