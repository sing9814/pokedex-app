import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState, } from "react";
import { getAllPokemonDetailsAPI, getAllPokemonAPI } from '../api/pokemon';
import { Searchbar } from 'react-native-paper';
import PokemonList from '../components/PokemonList';

function PokedexScreen() {
    const [data, setData] = useState({})
    const [filteredData, setFilteredData] = useState({})
    const [search, setSearch] = useState('')

    useEffect(() => {
        getPokemon()
    }, [])

    const getPokemon = async () => {
        try {
            const api = await getAllPokemonAPI()
            const pokeDetailsData = await Promise.all(api.results.map(async (item) => {
                const pokemonDetails = await getAllPokemonDetailsAPI(item.url)
                return {
                    id: pokemonDetails.id,
                    name: pokemonDetails.name,
                    type: pokemonDetails.types,
                    img: pokemonDetails.sprites.other["official-artwork"].front_default,
                }
            }))

            setData(pokeDetailsData)
            setFilteredData(pokeDetailsData)
        }
        catch (error) {
            console.error(error);
        }
    }

    function isNumber(str) {
        if (str.trim() === '') {
            return false;
        }
        return !isNaN(str);
    }

    const filterPokemon = (text) => {
        setSearch(text)
        if (text) {
            const newData = data.filter((item) => {
                if (isNumber(text)) {
                    const itemData = item.id ? item.id.toString() : ''.toUpperCase()
                    const textData = text.toUpperCase()
                    return itemData.indexOf(textData) > -1
                }
                else {
                    const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase()
                    const textData = text.toUpperCase()
                    return itemData.indexOf(textData) > -1
                }
            })
            setFilteredData(newData)
            setSearch(text)
        } else {
            setFilteredData(data)
            setSearch(text)
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#fff' />

            <Text style={styles.title}>Pokedex</Text>
            <Searchbar
                placeholder="Search by name or ID"
                onChangeText={(text) => filterPokemon(text)}
                value={search}
                style={{ borderRadius: 30, elevation: 0, marginBottom: 15, marginTop: 5, backgroundColor: "#eee" }}
            />

            {Object.keys(data).length > 0 ? (
                <PokemonList data={filteredData} ></PokemonList>
            ) : (
                <ActivityIndicator color={"black"} size="large"></ActivityIndicator>
            )
            }

            <View style={{ height: 40, width: '100%' }}></View>
        </View >
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
        paddingBottom: 5,
        fontWeight: '800',
        padding: 10,
    },
});

export default PokedexScreen;