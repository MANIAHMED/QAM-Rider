import React, { Component, useState } from 'react'
import { View, ImageBackground, StatusBar, Keyboard, TouchableHighlight, TouchableOpacity } from 'react-native'
import { Container, Content, Text, Spinner, Item, Input, Button } from 'native-base'
import { styles } from './LoginStyle'
import { themeColor, lightTextColor, loaderBackgroundColor } from './../../constants'
import Logo from '../../uiComponents/Logo/Logo'
import { connect, useDispatch } from 'react-redux'
import { loginUser } from '../../store/middlewares/user.middleware'
import { updateExtra } from './../../store/middlewares/extra_middleware'
import Toast from './../../uiComponents/Toast/Toast'
import Loader from '../../uiComponents/Loader/Loader'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

function Login({updateExtra, loginUser,loading,error  }) {


      const reduxState = useSelector((extras) => {
        return {

            loading: extras.loading,
            error: extras.error
        
        }
    });

    const {loading, error} = reduxState;


    const dispatch = useDispatch()
  

    const [email,setEmail] = useState('')
    const [password, setPassword]= useState('')
    const [showPassword, setShowPassword] = useState(false)
 
const    handleInputs = (name, value) => {
        this.setState({
            [name]: value
        })
    }

  const  handleSubmit = async () => {
        Keyboard.dismiss()
        if (!email) {
            dispatch( updateExtra({ error: 'Phone Number is required' }))
            return
        }

        if (!password) {
            dispatch( updateExtra({ error: 'Password is required' }))
            return
        }

        let notification_token = await AsyncStorage.getItem('NOTIFICATION_TOKEN')

        dispatch( loginUser(email, password, notification_token))
    }

  const   handleToastClose = () => {
        dispatch(  updateExtra({ error: '' }))
    }

  const  handleShowPassword = () => {
    setShowPassword(!showPassword)
    }


        return (
            <Container style={styles.container}>
                {
                    error !== '' &&
                    <Toast text={error} duration={3000} onClose={this.handleToastClose} />
                }
                <StatusBar
                    backgroundColor={loading ? loaderBackgroundColor : "#ffffff"}
                    barStyle={loading ? "light-content" : "dark-content"}
                />
                <Loader loading={loading} />
                <Content contentContainerStyle={styles.content} >
                    <Logo style={styles.logo} />
                    <View style={styles.inputsView}>
                        <Item style={styles.inputItem}>
                            <Input
                                placeholder='Phone Number'
                                autoCapitalize="none"
                                placeholderTextColor={lightTextColor}
                                style={styles.input}
                                value={email}
                                onChangeText={(text) => handleInputs('email', text)}
                            />
                        </Item>
                        <Item style={styles.inputItem}>
                            <Input
                                placeholder='Password'
                                secureTextEntry={!showPassword}
                                placeholderTextColor={lightTextColor}
                                style={styles.input}
                                value={password}
                                onChangeText={(text) => handleInputs('password', text)}
                            />
                            <TouchableOpacity onPress={this.handleShowPassword}>
                                <MaterialCommunityIcons name={showPassword ? "eye-off" : 'eye'} color={themeColor} size={30} />
                            </TouchableOpacity>
                        </Item>
                        <Button style={styles.button} onPress={this.handleSubmit}>
                            <Text style={styles.buttonText}>Login</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        )
    }


export default Login;