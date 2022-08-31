import React, { createContext, useEffect, useState } from 'react'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(null)

    const userLogin = { username: 'FieldEffect', password: '123' }

    const login = (username, password) => {
        if (username === userLogin.username && password === userLogin.password) {
            setUserToken('userToken')
            AsyncStorage.setItem('userToken', 'userToken')
        }
        else {
            Alert.alert("Invalid log in credientials")
        }
    }

    const logout = () => {
        setUserToken(null)
        AsyncStorage.removeItem('userToken')
    }

    const isLoggedIn = async () => {
        try {
            let userToken = await AsyncStorage.getItem('userToken')
            setUserToken(userToken)
        } catch (e) {
            console.error(`isLoggedIn error ${e}`)
        }
    }

    useEffect(() => {
        isLoggedIn()
    }, [])

    return (
        <AuthContext.Provider value={{ login, logout, userToken }}>
            {children}
        </AuthContext.Provider>
    )
}