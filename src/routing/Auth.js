import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from '../pages';

export const AuthStack = createStackNavigator();

function Auth (){
    return(
        <AuthStack.Navigator screenOptions={{headerShown: false}}>
            <AuthStack.Screen name='login' component={Login} />
        </AuthStack.Navigator>
 
    )
}

export default Auth;