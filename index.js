
import * as React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import store from './src/store';
import { NavigationContainer } from "@react-navigation/native";

const Root = () => {
    return (
            <Provider store={store}>
                <App />
            </Provider>

    )
}

AppRegistry.registerComponent(appName, () => Root);
