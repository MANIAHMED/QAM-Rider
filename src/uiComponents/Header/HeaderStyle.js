import { StyleSheet, Platform } from 'react-native'
// import { themeColor, textColor, backgroundColor } from '../../constants'


export const styles = StyleSheet.create({
    header: {
        backgroundColor: 'ffffff',
        width: '100%'
    },
    right: {
        // backgroundColor: 'blue'
    },
    rightView: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        width: 100,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: 40,
        flexDirection: 'row',
        borderRadius: 90,
        // padding: 5
    },
    walletText: {
        color: '000000',
        fontWeight: 'bold'
    },
    headerTitle: {
        color: backgroundColor,
        fontWeight: 'bold',
        textAlign: (Platform.OS == 'ios') ? 'center' : 'left',
        width: (Platform.OS == 'android') ? 250 : null
    },
})