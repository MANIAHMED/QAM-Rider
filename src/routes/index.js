import React, { useEffect } from "react";
import 'react-native-gesture-handler';
import { Router, Scene, Actions } from 'react-native-router-flux';
import Home from "../pages/home/Home"
import DrawerNavigation from "./drawerNavigation";
import Login from "../pages/Login/Login";
import { checkAuth } from './../helpers';
import Bookings from "../pages/bookings/Bookings";
import store from './../store'
import { FetchAdminitrationNumber } from "../store/middlewares/extra.middleware";
import { BackHandler } from "react-native";


function Routes({ lng, handleLanguageChange }) {

    useEffect(() => {

        checkAuth();
        store.dispatch(FetchAdminitrationNumber())

        const backHandler = BackHandler.addEventListener('hardwareBackPress', function () {
            if (Actions.currentScene === 'Home') {
                BackHandler.exitApp()
                return true;
            } else if (Actions.currentScene === 'Login') {
                BackHandler.exitApp()
                return true;
            }
            return false;
        });

        return () => backHandler.remove;
    }, [])

    const renderComponentWithDrawer = (Component, props) => {
        return (
            <DrawerNavigation {...props}>
                <Component />
            </DrawerNavigation>
        )
    }

    return (
        <Router>
            <Scene key="root" lng={lng || 'en'} handleLanguageChange={handleLanguageChange} >
                <Scene
                    key="Login"
                    component={(props) => <Login {...props} />}
                    hideNavBar={true}
                    initial={true}
                />
                <Scene
                    key="Home"
                    component={(props) => renderComponentWithDrawer(Home, props)}
                    hideNavBar={true}
                    initial={false}
                    panHandlers={null}
                />
                <Scene
                    key="Bookings"
                    component={(props) => renderComponentWithDrawer(Bookings, props)}
                    hideNavBar={true}
                    initial={false}
                />
            </Scene>
        </Router >
    )
}


export default Routes;