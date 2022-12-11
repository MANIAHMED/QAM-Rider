import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBar from '../containers/tabBar/TabBar';
import { Home, PrivacyPolicy, Profile } from '../pages';

const Tab = createBottomTabNavigator();


export const HomeStack = createStackNavigator();
function HomeStacks() {
    return (
        <HomeStack.Navigator initialRouteName="home" screenOptions={{ headerShown: false }}>
            <HomeStack.Screen name="home" component={Home} />
        </HomeStack.Navigator>
    );
}

export const PrivacyPolicyStack = createStackNavigator();
function PrivacyPolicyStacks() {
    return (
        <PrivacyPolicyStack.Navigator initialRouteName="privacyPolicy" screenOptions={{ headerShown: false }}>
            <PrivacyPolicyStack.Screen name="privacyPolicy" component={PrivacyPolicy} />
        </PrivacyPolicyStack.Navigator>
    );
}


export const ProfileStack = createStackNavigator();
function ProfileStacks() {
    return (
        <ProfileStack.Navigator initialRouteName="profile" screenOptions={{ headerShown: false }}>
            <ProfileStack.Screen name="profile" component={Profile} />
        </ProfileStack.Navigator>
    );
}



function Root() {






    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false, unmountOnBlur: true }}
            tabBar={props => <TabBar {...props} />}>
            <Tab.Screen name="HomeStack" component={HomeStacks} />
            {/* <Tab.Screen name="PrivacyPolicyStack" component={PrivacyPolicyStack} /> */}
            <Tab.Screen name="ProfileStack" component={ProfileStacks} />
        </Tab.Navigator>
    )
}

export default Root;