import React, { Component } from 'react'
import { View, Spinner } from 'native-base'
import { styles } from './LoaderStyle'
import Theme from '../../utils/theme'

const Loader = ({ loading = false }) => {
    if (!loading) {
        return null
    }
    return (
        <View style={styles.loaderView}>
            <Spinner color={Theme['light'].colors.primary} />
        </View>
    )
}

export default Loader