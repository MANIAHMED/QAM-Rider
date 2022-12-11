import React, { Component } from 'react'
import { styles } from './ToastStyle'
import { Toast } from 'native-base'

const CustomToast = ({ duration = 3000, text = '', onClose = () => { } }) => {
    Toast.show({
        duration,
        text,
        onClose
    })

    return null
}

export default CustomToast