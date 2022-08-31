import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PokedexScreen from '../screens/PokedexScreen';
import { FontAwesome, Entypo, } from '@expo/vector-icons';
import Account from './Account';

const Tab = createBottomTabNavigator()

function Tabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    elevation: 3,
                }
            }} >
            <Tab.Screen name="Pokedex" component={PokedexScreen} options={{ headerShown: false, tabBarIcon: ({ focused }) => (<Entypo name="home" size={24} color={focused ? "#000" : "#777"} />) }}></Tab.Screen>
            <Tab.Screen name="Account" component={Account} options={{ headerShown: false, tabBarIcon: ({ focused }) => (<FontAwesome name="user-circle-o" size={24} color={focused ? "#000" : "#777"} />) }}></Tab.Screen>
        </ Tab.Navigator >
    )
}

export default Tabs