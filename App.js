
import React, { Fragment, useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Root from "native-base";
import { Provider } from 'react-native-paper'
import { onesignalAppId } from "./src/utils/constant";

const App = () => {

  const dispatch = useDispatch();

  const [lng, setLng] = useState(null);


  const onIds = async (device) => {
    if (device.userId) {
      await AsyncStorage.setItem('NOTIFICATION_TOKEN', device.userId)
    }
  }

  useEffect(() => {
    OneSignal.init(onesignalAppId);
    OneSignal.addEventListener('ids', onIds);
    return () => OneSignal.removeEventListener('ids', this.onIds)
  }, [])

  useEffect(() => {


    let lng = AsyncStorage.getItem('@lng');
    if (lng) {
      setLng(lng)
    } else {
      AsyncStorage.setItem('@lng', 'en')
      setLng('en')
    }
  }, [])



  const handleLanguageChange = async (lng) => {
    await AsyncStorage.setItem('@lng', lng)
    setLng(lng)
  }

  return (
    <Provider>
      <Root>
        {
          lng &&
          <Routes
            lng={lng}
            // lng={'en'}
            handleLanguageChange={handleLanguageChange}
          />
        }
      </Root>
    </Provider>
  )

}

export default App;