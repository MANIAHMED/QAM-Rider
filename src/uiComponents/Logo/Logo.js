import React, { Component } from 'react'
// import { themeColor } from '../../constants'
import { styles } from './LogoStyle'
import { Image } from 'react-native'

const Logo = ({ height = 120, width = 100, style = {} }) => {
    return (
        <Image source={require('./../../assets/images/qam-logo.png')} resizeMode={'stretch'} width={width} height={height} style={style} />
    )
}

export default Logo