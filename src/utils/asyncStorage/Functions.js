import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {TOKEN, USER} from "./Constants";

export const _setDataToAsyncStorage = async (key, data) => {
    try {
        await AsyncStorage.setItem(key, data);
    } catch (error) {
        console.log(error)
      
    }
};

export const clearStorageData = () => {
    AsyncStorage.removeItem(USER);
    AsyncStorage.removeItem(TOKEN);
};

export const getValueIntoAsyncStorage = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value
        } else {
            return null
        }

    } catch (error) {
        console.log(error)
        return null
    }
};

export const getTokenAndSetIntoHeaders = async (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `${token}`;
    } else {
        let accessToken = await getValueIntoAsyncStorage(TOKEN);
        if (accessToken) {
            axios.defaults.headers.common['Authorization'] = `${accessToken}`;
        }
    }
};