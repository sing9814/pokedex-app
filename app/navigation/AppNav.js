import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PokemonScreen from '../screens/PokemonScreen';
import Tabs from './tabs';

const Stack = createNativeStackNavigator();

function AppNav() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Tabs">
                <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
                <Stack.Screen name="Pokemon" component={PokemonScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNav;