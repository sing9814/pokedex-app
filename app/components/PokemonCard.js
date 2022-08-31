import { StyleSheet, View, TouchableWithoutFeedback, Image, ImageBackground, } from 'react-native';
import React from "react";
import { Card } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { colours } from '../components/colors';

function PokemonCard({ item }) {
    const navigation = useNavigation();

    return (
        <TouchableWithoutFeedback onPress={() => {
            navigation.navigate("Pokemon", { id: item.id })
        }}>
            <View style={styles.cardContainer}>
                <Card containerStyle={{ ...styles.card, backgroundColor: colours[item.type[0].type.name] }} >
                    <ImageBackground source={require('../components/images/pokeball.png')} imageStyle={styles.pokeball}>
                        <Card.FeaturedTitle style={styles.name}>{item.name}
                        </Card.FeaturedTitle>
                        <View style={{ width: 60, }}>
                            <Card.FeaturedSubtitle style={styles.type}>{item.type[0].type.name}</Card.FeaturedSubtitle>
                            {typeof (item.type[1]) !== "undefined" ? <Card.FeaturedSubtitle style={styles.type}>{item.type[1].type.name}</Card.FeaturedSubtitle> : <Card.FeaturedSubtitle style={{ ...styles.type, opacity: 0 }}></Card.FeaturedSubtitle>}
                        </View>
                        <Image
                            style={styles.image}
                            source={{
                                uri:
                                    item.img
                            }}
                        />
                    </ImageBackground>
                </Card>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        width: "49%",
        borderRadius: 20,
        marginBottom: 10,
    },
    card: {
        height: 115,
        borderRadius: 20,
        padding: 0,
        paddingTop: 5,
        paddingLeft: 15,
        margin: 0,
    },
    pokeball: {
        opacity: 0.3,
        position: "absolute",
        left: 70,
        top: 10,
        height: 90
    },
    name: {
        color: "#fff",
        textTransform: "capitalize",
        fontSize: 18,
        paddingBottom: 5
    },
    type: {
        fontWeight: "normal",
        width: 60,
        backgroundColor: 'rgba(255, 255, 255, .25)',
        textAlign: "center",
        borderRadius: 10,
        textTransform: "capitalize",
    },
    image: {
        height: 80,
        width: 80,
        position: 'absolute',
        bottom: -10,
        left: "45%",
    },
});

export default PokemonCard;