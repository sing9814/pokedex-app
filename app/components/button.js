import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from "react";

function CustomButton({ text, onPress, backgroundColor }) {
    return (
        <TouchableOpacity onPress={onPress} style={{ ...styles.button, backgroundColor: backgroundColor }}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
        marginBottom: 10,
        marginTop: 5,
        height: 50,
        justifyContent: "center",
        width: "100%",
        alignSelf: "center",
    },
    text: {
        fontSize: 18,
        textAlign: "center",
        fontWeight: "700",
    }
});

export default CustomButton;