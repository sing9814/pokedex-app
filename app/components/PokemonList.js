import { StyleSheet, Text, FlatList } from 'react-native';
import React from "react";
import PokemonCard from '../components/PokemonCard';

function PokemonList({ data }) {
    const ListEmptyComponent = () => {
        return (
            <Text>No Pokemon Found</Text>
        )
    }

    return (
        <FlatList style={styles.flatlist}
            data={data}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            key={(data) => String(data.id)}
            keyExtractor={data => String(data.id)}
            ListEmptyComponent={ListEmptyComponent}
            renderItem={({ item }) => (
                <PokemonCard item={item}></PokemonCard>
            )}
        >
        </FlatList>
    );
}

const styles = StyleSheet.create({
    flatlist: {
        height: "100%",
        width: "100%",
        backgroundColor: "#fff",
    },
});

export default PokemonList;