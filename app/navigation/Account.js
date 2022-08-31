import React, { useContext } from 'react';
import { View } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import FavouritesScreen from '../screens/FavouritesScreen';
import LogInScreen from '../screens/LogInScreen';

function Account() {
    const { userToken } = useContext(AuthContext)
    return (
        <View>{userToken !== null ? <FavouritesScreen /> : <LogInScreen />}</View>
    );
}

export default Account;