import React, { useState } from 'react'
import { View, StatusBar, Keyboard, TouchableOpacity } from 'react-native'
import { Container, Content, Text, Spinner, Item, Input, Button } from 'native-base'
import { styles } from './LoginStyle'
// import { themeColor, lightTextColor, loaderBackgroundColor } from './../../constants'
import Logo from '../../uiComponents/Logo/Logo'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../store/middlewares/user.middleware'
import { updateExtra } from './../../store/middlewares/extra.middleware'
import Toast from './../../uiComponents/Toast/Toast'
import Loader from '../../uiComponents/Loader/Loader'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Theme from '../../utils/theme'

function Login() {


    const reduxState = useSelector((extras) => {
        return {

            loading: extras.loading,
            error: extras.error

        }
    });

    const { loading, error } = reduxState;


    const dispatch = useDispatch()


    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

 

    const handleSubmit = async () => {
        Keyboard.dismiss()
        if (!email) {
            dispatch(updateExtra({ error: 'Phone Number is required' }))
            return
        }

        if (!password) {
            dispatch(updateExtra({ error: 'Password is required' }))
            return
        }

        let notification_token = await AsyncStorage.getItem('NOTIFICATION_TOKEN')

        dispatch(loginUser(phone, password, notification_token))
    }

    const handleToastClose = () => {
        dispatch(updateExtra({ error: '' }))
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }


    return (
        <Container style={styles.container}>
            {
                error !== '' &&
                <Toast text={error} duration={3000} onClose={handleToastClose} />
            }
            <StatusBar
                backgroundColor={loading ? Theme['light'].color.backgroundColor : "#ffffff"}
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
                            placeholderTextColor={Theme['light'].colors.primary}
                            style={styles.input}
                            value={email}
                            onChangeText={(text) => setPhone(text)}


                        />
                    </Item>
                    <Item style={styles.inputItem}>
                        <Input
                            placeholder='Password'
                            secureTextEntry={!showPassword}
                            placeholderTextColor={Theme['light'].colors.primary}
                            style={styles.input}
                            value={password}
                            onChangeText={(text) => setPassword(text)}

                        />
                        <TouchableOpacity onPress={handleShowPassword}>
                            <MaterialCommunityIcons name={showPassword ? "eye-off" : 'eye'} color={Theme['light'].colors.primary} size={30} />
                        </TouchableOpacity>
                    </Item>
                    <Button style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Login</Text>
                    </Button>
                </View>
            </Content>
        </Container>
    )
}


export default Login;