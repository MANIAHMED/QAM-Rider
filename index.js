
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {interceptor} from './src/utils/interceptor';
import store from './src/store';
import OneSignal from 'react-native-onesignal'; // Import package from node modules
import { onesignalAppId } from './src/utils/constant';


interceptor();



const Root = ()=> {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <App />
            </NavigationContainer>
        </Provider>
    )
}


AppRegistry.registerComponent(appName, () => Root);
