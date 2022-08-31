import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, View, Text, Image, ActivityIndicator, ImageBackground, Alert } from 'react-native';
import { getIDPokemonDetailsAPI } from "../api/pokemon";
import { colours } from "../components/colors";
import ProgressBar from 'react-native-progress/Bar'
import { FontAwesome, Feather } from '@expo/vector-icons';
import { setFavouritesAPI, removeFavouritesAPI, isPokemonFavourite } from '../api/favourites';
import { AuthContext } from '../context/AuthContext';

function PokemonScreen({ navigation: { goBack }, route }) {
    const [data, setData] = useState({})
    const id = route.params.id
    const [isFavourite, setIsFavourite] = useState()
    const { userToken } = useContext(AuthContext)

    useEffect(() => {
        (async () => {
            if (userToken !== null) {
                try {
                    const favourites = await isPokemonFavourite(id)
                    setIsFavourite(favourites);
                } catch (error) {
                    console.error(error)
                }
            }
        })();
    }, [id, isFavourite]);

    useEffect(() => {
        getPokemon()
    }, [])

    const changeFavouriteState = async (id) => {
        if (userToken !== null) {
            if (isFavourite) {
                setIsFavourite(false)
                removeFavouritesAPI(id)
            } else {
                setIsFavourite(true)
                setFavouritesAPI(id)
            }
        } else {
            Alert.alert("Log in to favourite Pokemon")
        }
    }

    const getPokemon = async () => {
        try {
            const api = await getIDPokemonDetailsAPI(id)
            const organizedData = {
                id: api.id,
                name: api.name,
                type: api.types,
                weight: api.weight / 10,
                height: api.height / 10,
                stats: api.stats,
                img: api.sprites.other["official-artwork"].front_default,
            }
            setData(organizedData)
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <View>
            <StatusBar hidden />
            {Object.keys(data).length > 0 ? (
                <>
                    <View style={{ ...styles.container, backgroundColor: colours[data.type[0].type.name] }}>
                        <ImageBackground source={require('../components/images/pattern.png')} style={{ height: "100%", width: "100%", paddingTop: 30 }}>

                            <View style={{ paddingHorizontal: 20 }}>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                                    <FontAwesome name="long-arrow-left" size={24} color="white" style={{ paddingBottom: 20 }} onPress={() => goBack()} />
                                    {isFavourite ? <FontAwesome name="heart" size={24} color="white" onPress={() => changeFavouriteState(data.id)} /> : <Feather name="heart" size={24} color="white" onPress={() => changeFavouriteState(data.id)} />}
                                </View>
                                <View style={{ ...styles.horizontal, justifyContent: 'space-between' }}>
                                    <Text style={styles.name}>{data.name}</Text>
                                    <Text style={styles.id}>#{`${data.id}`.padStart(3, 0)}</Text>
                                </View>

                                <View style={styles.horizontal}>
                                    <Text style={styles.type}>{data.type[0].type.name}</Text>
                                    {typeof (data.type[1]) !== "undefined" ? <Text style={styles.type}>{data.type[1].type.name}</Text> : <Text style={{ ...styles.type, opacity: 0 }}></Text>}
                                </View>
                            </View>

                            <View style={styles.whiteContainer}>
                                <Image
                                    style={styles.image}
                                    source={{
                                        uri:
                                            data.img
                                    }}
                                />

                                <View style={styles.heightWeightContainer}>
                                    <View style={styles.vertical}>
                                        <Text style={styles.header}>Height</Text>
                                        <Text style={{ fontWeight: "600" }}>{data.height} cm</Text>
                                    </View>
                                    <View style={styles.vertical}>
                                        <Text style={styles.header}>Weight</Text>
                                        <Text style={{ fontWeight: "600" }}>{data.weight} kg</Text>
                                    </View>
                                </View>

                                <Text style={{ alignSelf: "flex-start", fontSize: 18, paddingBottom: 10, fontWeight: '700' }}>Base Stats</Text>
                                {data.stats.map((item, index) => (
                                    <View key={index} style={styles.statContainer}>
                                        <Text style={{ ...styles.header, width: "35%" }}>{item.stat.name}</Text>
                                        <Text style={{ width: 35, fontWeight: "600" }}>{item.base_stat}</Text>
                                        <ProgressBar progress={item.base_stat / 100} width={180} useNativeDriver={true} color={item.base_stat <= 50 ? "#ff0000" : "#7AC74C"} animated={true} borderWidth={0} unfilledColor={"#ddd"} height={4}></ProgressBar>
                                    </View>
                                ))}
                            </View>
                        </ImageBackground>
                    </View>
                </>
            ) : (
                <ActivityIndicator color={"black"} size="large"></ActivityIndicator>
            )
            }
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#eee',
        paddingTop: 20,
        width: "100%",
        height: "100%",
        paddingTop: StatusBar.currentHeight,
    },
    horizontal: {
        flexDirection: 'row',
        alignItems: "center"
    },
    name: {
        color: "#fff",
        textTransform: "capitalize",
        fontSize: 30,
        paddingBottom: 5,
        fontWeight: '800'
    },
    id: {
        color: "#fff",
        fontWeight: '600'
    },
    type: {
        fontWeight: "normal",
        width: 60,
        height: 22,
        backgroundColor: 'rgba(255, 255, 255, .25)',
        textAlign: "center",
        alignItems: "center",
        borderRadius: 10,
        textTransform: "capitalize",
        color: "#fff",
        marginEnd: 5
    },
    whiteContainer: {
        backgroundColor: "white",
        height: "60%",
        width: "100%",
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        position: "absolute",
        bottom: 0,
        alignItems: "center",
        paddingTop: 30,
        paddingHorizontal: 20
    },
    image: {
        height: 170,
        width: 170,
        position: 'absolute',
        bottom: -10,
        alignSelf: "center",
        top: -140
    },
    heightWeightContainer: {
        height: 60,
        width: "95%",
        flexDirection: "row",
        elevation: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        paddingHorizontal: 20,
        marginBottom: 30
    },
    header: {
        color: "#aaa",
        fontWeight: "600",
        textTransform: "capitalize"
    },
    vertical: {
        width: 150
    },
    statContainer: {
        flexDirection: "row",
        paddingVertical: 5,
        alignItems: "center",
    },
});

export default PokemonScreen;