import { StyleSheet } from 'react-native'
import Theme from '../../utils/theme'
// import { loaderBackgroundColor } from '../../constants'

export const styles = StyleSheet.create({
    loaderView: {
        zIndex: 99,
        position: 'absolute',
        backgroundColor: Theme['light'].colors.primary,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})