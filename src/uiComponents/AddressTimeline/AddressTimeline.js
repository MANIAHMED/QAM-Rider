import React from 'react'
import React, { Component } from 'react'
import { Text, View, Button, Entypo } from 'react-native';
import Styles from './AddressTimelineStyle';
import { Actions } from 'react-native-router-flux';
import { makeCall } from '../../utils/helpers'



function AddressTimeline() {
    const [visible, setVisible] = useState(false);
    const _openMenu = () => {
        setVisible(true)
    }
    const _closeMenu = () => {
        setVisible(false)
    }
    // let { from, to, isMenuBtn, customerNumber = '' } = this.props


    return (
        <View style={Styles.addressTimeline}>
            <View style={Styles.timelineView} >
                <Entypo name="dot-single" size={30} color={themeColor + '8a'} style={Styles.icon} />
                <View style={Styles.timelineBorder}>

                </View>
                <Entypo name="dot-single" size={30} color={themeColor} style={Styles.icon} />
            </View>
            <View style={Styles.addressView}>
                <View style={Styles.fromAddressView} >
                    <Text style={Styles.addressLineOne}>From</Text>
                    <Text style={Styles.addressLineTwo} numberOfLines={1}>{from || ''}</Text>
                </View>
                <View style={Styles.toAddressView} >
                    <Text style={Styles.addressLineOne}>To</Text>
                    <Text style={Styles.addressLineTwo} numberOfLines={1}>{to || ''}</Text>
                </View>
            </View>
        </View>
    )
}

export default AddressTimeline;



