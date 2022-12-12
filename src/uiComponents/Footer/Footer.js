import React, { Component } from 'react'
import { Text, View, TouchableHighlight, TouchableNativeFeedback, TouchableOpacity } from 'react-native'
import { Footer as NBFooter, FooterTab, Body, Left, Right } from 'native-base'
// import { themeColor, backgroundColor } from '../../constants'
import { styles } from './FooterStyle'
import SwitchToggle from '@dooboo-ui/native-switch-toggle';
import i18n from './../../i18n'
import LottieView from 'lottie-react-native';
import { connect, useDispatch, useSelector } from 'react-redux'
import { changeUserAvailablity } from '../../store/middlewares/user.middleware'
import Theme from '../../utils/theme';

function Footer({ handleCollapsibleView, lng, expanded,  changeUserAvailablity }) {
    

    const dispatch = useDispatch()

   const reduxState = useSelector((states) => {
        return {
            bookings: states.bookings,
            isAvailable: (states.user && states.user.isAvailable) || false
        }
    });

    const { bookings, isAvailable } = reduxState;
    

    const handleArrowButton = (expanded) => {
        handleCollapsibleView(expanded)
    }

 
        return (
            <NBFooter style={styles.footer} >
                <Left>
                    {
                        bookings.length != 0 ?
                            <TouchableOpacity style={styles.leftView} onPress={() => handleArrowButton(!expanded)} >
                                <LottieView
                                    ref={animation => {
                                        this.animation = animation;
                                    }}
                                    autoPlay
                                    loop
                                    colorFilters={[
                                        {
                                            keypath: "Path 1",
                                            color: backgroundColor
                                        },
                                        {
                                            keypath: "Path 2",
                                            color: backgroundColor
                                        },
                                        {
                                            keypath: "scroll_up",
                                            color: backgroundColor
                                        }
                                    ]}
                                    style={styles.animation}
                                    source={expanded ? require('./../../assets/images/arrow-down.json') : require('./../../assets/images/arrow-up.json')}
                                />
                            </TouchableOpacity> : null
                    }
                </Left>
                <Body style={styles.body} >
                    <Text style={styles.bodyText} >{`${i18n.t('Home.footerText', { lng })} ${isAvailable ? i18n.t('Home.statusOnline', { lng }) : i18n.t('Home.statusOffline', { lng })}`.toUpperCase()}</Text>
                </Body>
                <Right style={styles.right}>
                    <SwitchToggle
                        switchOn={isAvailable}
                        containerStyle={styles.switchContainer}
                        circleStyle={styles.switchCircle}
                        onPress={() => dispatch(changeUserAvailablity())}
                        backgroundColorOff={Theme['light'].colors.background}
                        backgroundColorOn={Theme['light'].colors.background + 'c7'}
                        circleColorOn={Theme['light'].colors.primary}
                        circleColorOff={Theme['light'].colors.primary + '6e'}
                    />
                </Right>
            </NBFooter>
        )
    }


export default Footer;