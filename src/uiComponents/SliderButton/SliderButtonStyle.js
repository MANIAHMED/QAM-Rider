import { StyleSheet } from 'react-native'
import Theme from '../../utils/theme'
// import { backgroundColor } from '../../constants'

export const styles = StyleSheet.create({
    buttonContainer: { 
        height: 54 
    },
    animationIconContainer: {
        width: 50, 
        height: 50, 
        borderRadius: 60,
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'center'
    },
    animationIcon: {
        width: 60, 
        height: 60, 
        marginLeft: -2.5
    },
    buttonText: {
        color: Theme['light'].colors.primary
    }
})