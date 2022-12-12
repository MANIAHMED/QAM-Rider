import React from 'react'
import { styles } from './LogoStyle'
import { Image } from 'react-native'

const Logo = ({ height = 120, width = 100, style = {} }) => {
    return (
        <Image source={require('./../../assets/images/qam-logo.png')} resizeMode={'stretch'} width={width} height={height} style={styles} />
    )
}

export default Logo