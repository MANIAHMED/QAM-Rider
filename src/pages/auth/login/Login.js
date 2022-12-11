import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { ProgressiveImage, ViewContainer } from "../../../containers";
import CForm from "./Form";
import Styles from '../AuthStyle';
import { View, Text } from "react-native";
// import { login } from "../../../store/actions/Auth";



function Login(props) {

    const { navigation } = props;

    const dispatch = useDispatch();

    const reduxState = useSelector(({ auth }) => {
        return {
            loading: auth.loginLoading
        }
    });

    const userImage = require('../../../assets/images/qam-logo.png')

    const submit = (values) => {
        // dispatch(login(values))
    };

    const navigate = (routeName) => {
        navigation.navigate(routeName)
    };


    return (
        <ViewContainer>
            <View style={Styles.headingContainer}>
                <View style={Styles.logoCenter}>
                    <ProgressiveImage style={Styles.signUpLogo} source={userImage} />
                </View>
                <Text style={Styles.subHeading}>User Login</Text>
            </View>
            <CForm loading={reduxState.loading} submit={submit} navigate={navigate} />
        </ViewContainer>
    )
}

export default Login;
