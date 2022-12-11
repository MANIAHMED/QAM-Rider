import { useNavigation } from "@react-navigation/native";
import React from "react";
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import Styles from './HeaderStyle'


function Header(props) {

    const {isBack, Title} = props
 
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const navigate = (routeName, params) => {
        navigation.navigate(routeName, params)
    }

    const backButton = () => {
        return (
            <TouchableOpacity  onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back"  />
            </TouchableOpacity>
        )
    };

    return (<>
        <View style={Styles.header} >
            <SafeAreaView  style={Styles.headerContainer}>
                <View style={Styles.headerLeft} >
                    {isBack ? backButton(): ""}
                  
                    <Text>{Title}</Text>
                </View>

                <View style={Styles.headerRight}>
                    <Text>jjjj</Text>
                </View>
            </SafeAreaView>

        </View>
    </>)

}

export default Header;