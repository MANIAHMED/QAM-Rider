import React, { Component } from 'react'
import { Image, ScrollView } from 'react-native'
import { Text, View, List, ListItem, Left, Body, Right } from 'native-base'
import { Actions } from "react-native-router-flux";
import { styles } from './DrawerStyle';
import StarRating from 'react-native-star-rating';
import { textColor, backgroundColor } from '../../utils/helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect, useDispatch, useSelector } from 'react-redux'
// import BackgroundGeolocation from '@darron1217/react-native-background-geolocation';
import { LogoutUser } from '../../helpers/apis';
import { Socket } from 'socket.io-client';
import axios from 'axios';
import { changeUserAvailablity } from '../../store/middlewares/user_middleware';
import { makeCall } from '../../helpers';

function Drawer({ closeControlPanel, openControlPanel, }) {

    const dispatch = useDispatch();


    const reduxState = useSelector(({ extras, user }) => {
        return {
            administration_number: extras.administration_number || '',
            user: user
        }
    });

    const { administration_number, user } = reduxState;
    const [starCount, setStarCount] = useState(3)

    const onStarRatingPress = (rating) => {
        setStarCount(rating)
    }

    const handleTouch = (routeName) => {
        closeControlPanel()
        if (routeName !== Actions.currentScene) {
            Actions[routeName]()
        }
    }



  const  handleLogout = async () => {
        try {
            closeControlPanel()
            dispatch (changeUserAvailablity(async () => {
                await AsyncStorage.removeItem('ACCESS_TOKEN')
                await LogoutUser({ notificationToken: notification_token })
                axios.defaults.headers.common['Authorization'] = null;
                let notification_token = await AsyncStorage.getItem('NOTIFICATION_TOKEN')
                socket.disconnect()
                BackgroundGeolocation.stop() //working
                handleTouch('Login')
            }))
        } catch (error) {
            console.log(error)
        }
    }

    const riderList = () => {
        return (
            <List>

                <ListItem onPress={() => handleTouch('Home')} >
                    <Text style={styles.textFont}>{`Home`}</Text>
                </ListItem>

                <ListItem onPress={() => handleTouch('Bookings')} >
                    <Text style={styles.textFont}>{`Bookings`}</Text>
                </ListItem>

                <ListItem onPress={() => makeCall(administration_number)} >
                    <Text style={styles.textFont}>{`Call Administrator`}</Text>
                </ListItem>



                <ListItem onPress={() => handleLogout()} >
                    <Text style={styles.textFont}>{`Logout`}</Text>
                </ListItem>


            </List>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.bannerView} >
                <View style={styles.userDetailView}>
                    <Text style={styles.nameText}>{`${user.firstName || ''} ${user.lastName || ''}`}</Text>
                </View>
            </View>
            <View style={styles.listContainer} >
                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        riderList()
                    }
                </ScrollView>
            </View>
        </View>
    )
}

export default Drawer;