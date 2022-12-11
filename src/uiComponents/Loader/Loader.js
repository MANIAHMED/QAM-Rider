import React, { Component } from 'react'
import { View, Spinner } from 'native-base'
// import { themeColor } from '../../constants'
import { styles } from './Loader.style'

const Loader = ({ loading = false }) => {
    if (!loading) {
        return null
    }
    return (
        <View style={styles.loaderView}>
            <Spinner color={themeColor} />
        </View>
    )
}

export default Loader