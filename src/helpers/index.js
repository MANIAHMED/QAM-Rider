import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import store from './../store'
import { fetchUsersData } from '../store/middlewares/user.middleware';
import { Actions } from 'react-native-router-flux'
import { updateExtra } from '../store/middlewares/extra.middleware';
import { Linking } from 'react-native';

export const baseUrl = !__DEV__ ? 'https://admin.v2.qam.healthcare' : 'https://admin.v2.qam.healthcare' //http://10.40.5.108:8081
export const consentUrl = !__DEV__ ? 'https://admin.v2.qam.healthcare/consentForm' : 'https://admin.v2.qam.healthcare/consentForm'

// Production
export const onesignalAppId = '21713bac-c47b-4041-b530-0efbb8da658c'

axios.defaults.baseURL = baseUrl + '/api';

export const checkAuth = async () => {
    // store.dispatch(updateExtra({ loading: true, error: '' }))
    return new Promise(async (resolve, reject) => {
        try {
            let snap = await AsyncStorage.getItem('ACCESS_TOKEN')
            if (!snap) {
                throw new Error()
            }
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + snap;
            store.dispatch(fetchUsersData())
            resolve()
        } catch (e) {
            store.dispatch(updateExtra({ loading: false, error: '' }))
            if (Actions.currentScene != 'Login') {
                Actions.Login()
            }
            resolve()
        }
    })
}

export const getUniqueArray = (arr = [], compareProps = []) => {
    let modifiedArray = [];
    if (compareProps.length === 0 && arr.length > 0)
        compareProps.push(...Object.keys(arr[0]));
    arr.map(item => {
        if (modifiedArray.length === 0) {
            modifiedArray.push(item);
        } else {
            if (!modifiedArray.some(item2 =>
                compareProps.every(eachProps => item2[eachProps] === item[eachProps])
            )) { modifiedArray.push(item); }
        }
    });
    return modifiedArray;
}

export const numberFix = (number) => {
    return (number < 10 ? '0' : '') + number
}

export const makeCall = (number) => {

    let phoneNumber = '';

    if (Platform.OS === 'android') {
        phoneNumber = `tel:${number}`;
    } else {
        phoneNumber = `telprompt:${number}`;
    }

    Linking.openURL(phoneNumber);
};

export const sortByDate = (array = []) => {
    array = array.sort((a, b) => {
        return new Date(a.time) - new Date(b.time) || new Date(a.startTime) - new Date(b.startTime);
    });

    return array
}