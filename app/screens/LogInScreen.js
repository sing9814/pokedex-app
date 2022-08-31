import React, { useContext } from 'react';
import { StyleSheet, View, Text, Image, TextInput } from 'react-native';
import CustomButton from '../components/button';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AuthContext } from '../context/AuthContext';

function LogInScreen() {
    const { login, } = useContext(AuthContext)
    const [username, setUsername] = React.useState()
    const [password, setPassword] = React.useState()

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={{
                    uri:
                        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
                }}
            />
            <View style={styles.whiteRoundedContainer}></View>

            <View style={styles.logInContainer}>

                <Text style={styles.title}>Log in</Text>
                <Text style={styles.header}>Username</Text>
                <View style={styles.inputContainer}>
                    <Ionicons name="at-sharp" size={20} color="black" />
                    <TextInput
                        style={styles.textInput}
                        onChangeText={setUsername}
                        value={username}
                        placeholder="Eg. FieldEffect"
                    />
                </View>

                <Text style={styles.header}>Password</Text>
                <View style={styles.inputContainer}>
                    <Ionicons name="lock-closed-outline" size={20} color="black" />
                    <TextInput
                        style={styles.textInput}
                        onChangeText={setPassword}
                        value={password}
                        placeholder="Eg. 123"
                        secureTextEntry
                    ></TextInput>
                </View>
                <View style={{ height: "10%" }}></View>

                <CustomButton
                    text="Submit"
                    onPress={() => { login(username, password) }}
                    backgroundColor="#F7D02C"></CustomButton>
            </View>



        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F7D02C",
        paddingTop: 20,
        width: "100%",
        height: "100%",
        paddingBottom: 15,
        justifyContent: "center",
        zIndex: 1
    },
    image: {
        height: 150,
        width: 150,
        position: "absolute",
        top: "13%",
        zIndex: 5,
        right: 0
    },
    whiteRoundedContainer: {
        backgroundColor: "#fff",
        width: "100%",
        height: "70%",
        position: "absolute",
        bottom: 0,
        borderTopRightRadius: 100
    },
    logInContainer: {
        elevation: 10,
        backgroundColor: "#fff",
        height: "60%",
        width: "90%",
        alignSelf: 'center',
        padding: 20,
        borderRadius: 20,
    },
    title: {
        fontSize: 26,
        paddingBottom: 5,
        fontWeight: '800',
        margin: 20,
        alignSelf: 'center',
    },
    header: {
        fontWeight: '600',
        color: "#000",
        paddingLeft: 10
    },
    inputContainer: {
        borderRadius: 40,
        marginBottom: 15,
        marginTop: 5,
        backgroundColor: "#eee",
        flexDirection: "row",
        height: 50,
        fontSize: 16,
        padding: 10,
        paddingLeft: 15,
        borderColor: "#000",
        width: "100%",
        alignItems: "center",
    },
    textInput: {
        marginLeft: 10,
        fontSize: 16,
        width: "90%",
        height: 40,
    },
});

export default LogInScreen;