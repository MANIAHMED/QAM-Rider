import React, { useState } from 'react'
import { Header as NBHeader, Left, Body, Right, Title, Button, Text, View } from 'native-base'
import { styles } from './HeaderStyle'
import { StyleSheet, StatusBar } from 'react-native'
import Ionicons from 'react-native-vector-icons/dist/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'
// import { iconPlatorm, backgroundColor, themeColor } from '../../utils/constant'
import { Actions } from 'react-native-router-flux'
import numeral from 'numeral';

function Header({leftButtonType, showWallet, lng='en', wallet, backRoute, title, openControlPanel }) {


    const reduxState = useSelector(({  user={} }) => {
        return {
            wallet: user.totalAvailableAmount || 0

        }
    });

    const [localStyle, setLocalStyle] = useState(StyleSheet.create({
        headerButton: {
            alignSelf: props.lng === 'ar' ? 'flex-end' : 'flex-start'
        },
        headerTitle: {
            textAlign: props.lng === 'ar' ? 'right' : 'left',
            alignSelf: props.lng === 'ar' ? 'flex-end' : 'flex-start'
        }
    }))


  const   backAndMenuBtn = () => {
        if (leftButtonType == 'back') {
            return (
                <Button transparent style={localStyle.headerButton} onPress={handleBack} >
                    <Ionicons name={iconPlatorm + '-arrow-back'} size={30} color={Theme['light'].colors.background } />
                </Button>
            )
        } else if (leftButtonType == 'menu') {
            return (
                <Button transparent style={localStyle.headerButton} onPress={openControlPanel} >
                    <Ionicons name={iconPlatorm + '-menu'} size={30} color={Theme['light'].colors.background } />
                </Button>
            )
        } else {
            return null
        }
    }

 const handleBack = () => {
        if (backRoute) {
            Actions[backRoute]()
        } else {
            Actions.pop()
        }
    }

   const statusBarElem = () => {
        return (
            <StatusBar backgroundColor={Theme['light'].colors.background } barStyle="light-content" />
        )
    }

  const headerRight = () => {
        return (
            <Right style={[styles.right, { justifyContent: lng == 'en' ? 'flex-end' : 'flex-start' }]}>
                {
                    showWallet &&
                    <View style={styles.rightView} >
                        <MaterialCommunityIcons color={backgroundColor} name={'wallet'} size={25} />
                        <Text style={styles.walletText}>{numeral(Number(wallet)).format('0.0a')}</Text>
                    </View>
                }
            </Right>
        )
    }

   
        return (
            <NBHeader style={styles.header} hasTabs={this.props.hasTabs || false}>
                {
               statusBarElem()
                }
                {
                    lng === 'ar' ?
                 headerRight() :
                        <Left>
                            {backAndMenuBtn()}
                        </Left>
                }
                <Body>
                    <Title style={[styles.headerTitle, localStyle.headerTitle]}>{title}</Title>
                </Body>
                {
                    lng === 'ar' ?
                        <Left>
                            {backAndMenuBtn()}
                        </Left> :
                        headerRight()
                }
            </NBHeader>
        )
    }





export default Header;