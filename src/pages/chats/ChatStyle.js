import { StyleSheet } from 'react-native'
// import { backgroundColor, themeColor, textColor, SW } from './../../constants/index'
import Theme from '../../utils/theme';
export const styles = StyleSheet.create({
    container: {
        backgroundColor: Theme['light'].colors.background,
    },
    bubble: {
        backgroundColor: 'red',
        justifyContent: 'center',
        minWidth: 100,
        maxWidth: (SW / 2),
        borderRadius: 5,
        margin: 2,
        elevation: 1
    },
    messageText: {
        padding: 5
    }
})