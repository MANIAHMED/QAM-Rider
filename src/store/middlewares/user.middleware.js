import AsyncStorage from "@react-native-async-storage/async-storage";
import { users } from "../actions";
import { updateExtra } from './extra.middleware'
import { LoginUser, CheckAuth, SetUnavailable, SetAvailable, GetUserAddress } from "../../helpers/apis";
import { Actions } from "react-native-router-flux";
import BackgroundGeolocation from '@darron1217/react-native-background-geolocation';
import io from 'socket.io-client'
import { baseUrl } from '../../helpers/index'
import axios from "axios";

export const loginUser = (phone, password, notificationToken) => {
    return async (dispatch, getState) => {
        dispatch(updateExtra({ loading: true, error: '' }))
        try {
            let res = await LoginUser({ phone, password, notificationToken })
            await AsyncStorage.setItem('ACCESS_TOKEN', res.data.data.token)
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.data.token;
            dispatch(fetchUsersData())
        } catch (error) {
            dispatch(updateExtra({ loading: false, error: error.message || (error.data && error.data.message) || 'Something went wrong' }))
        }
    };
}


export const fetchUsersData = () => {
    return async (dispatch, getState) => {
        dispatch(updateExtra({ loading: true, error: '' }))
        try {
            const response = await CheckAuth();
            let user = response.data.data

            dispatch(users({ ...user }));
            dispatch(updateExtra({ loading: false, error: '' }))

            window.socket = io.connect(baseUrl + '/?vehicleId=' + response.data.data._id, { withCredentials: false, transports: ['websocket'] })

            if (Actions.currentScene == 'Login') {
                Actions.Home()
            }
        } catch (error) {
            dispatch(updateExtra({ loading: false, error: 'Session Expired' }))
            dispatch(users({}));
            if (Actions.currentScene != 'Login') {
                Actions.Login()
            }
        }
    };
};

export const updateUserData = () => {
    return async (dispatch, getState) => {
        try {
            const response = await CheckAuth();
            dispatch(users({ ...response.data.data }));
        } catch (error) {
            dispatch(updateExtra({ loading: false, error: error.message || (error.data && error.data.message) || 'Something went wrong' }))
        }
    };
};

export const changeUserAvailablity = (callback = () => { }) => {
    return async (dispatch, getState) => {
        let { user, bookings } = getState()
        dispatch(updateExtra({ loading: true, error: '' }))
        try {
            let { isAvailable } = user
            if (isAvailable) {
                await SetAvailable({ isAvailable: false })
                user.isAvailable = false
                BackgroundGeolocation.checkStatus(status => {
                    if (status.isRunning && !bookings.length) {
                        BackgroundGeolocation.stop()
                    }
                });
            } else {
                await SetAvailable({ isAvailable: true })
                user.isAvailable = true
                BackgroundGeolocation.start();
            }

            dispatch(users({ ...user }))
            dispatch(updateExtra({ loading: false, error: '' }))
            callback()
        } catch (error) {
            dispatch(updateExtra({ loading: false, error: error.message || (error.data && error.data.message) || 'Something went wrong' }))
        }
    };
}

export const getUserAddress = (lat, lng) => {
    return async (dispatch, getState) => {
        let { user } = getState()
        try {
            let address = await GetUserAddress(lat, lng)

            user.address = address

            dispatch(users({ ...user }))
        } catch (error) {

        }
    };
}
