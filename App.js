
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Auth from "./src/routing/Auth";
import Root from "./src/routing/Root";
import { Splash } from './src/uiComponents';
import { Header } from './src/containers';
import { checkAuth } from "./src/store/actions/Auth";
import { getAdministrationNumber } from "./src/store/actions/Common";
import OneSignal from 'react-native-onesignal';
import { onesignalAppId } from './src/utils/constant';
import { Text } from "react-native";




const App = () => {

  const dispatch = useDispatch();

  const [lng, setLng] = useState(null);

  const reduxState = useSelector(({ auth }) => {
    return {
      loading: auth.loading,
      getProfileLoading: auth.getProfileLoading,
      userLoggedIn: auth.userLoggedIn
    }
  });

  useEffect(() => {
    // dispatch(checkAuth());
    // dispatch(getAdministrationNumber());
  }, []);


  useEffect(() => {


    let lng = AsyncStorage.getItem('@lng');
    if (lng) {
      setLng(lng)
    } else {
      AsyncStorage.setItem('@lng', 'en')
      setLng('en')
    }
  }, [])


  const onIds = async (device) => {
    if (device.userId) {
      await AsyncStorage.setItem('NOTIFICATION_TOKEN', device.userId)
    }
  }

  const handleLanguageChange = async (lng) => {
    await AsyncStorage.setItem('@lng', lng)
    setLng(lng)
  }

  return (
    <Fragment>
      {reduxState?.getProfileLoading ? <Splash /> : reduxState?.userLoggedIn ? <Root lng={lng} handleLanguageChange={handleLanguageChange} /> : <Auth />}
    </Fragment>
  )

}

export default App;