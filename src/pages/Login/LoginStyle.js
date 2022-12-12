import { StyleSheet } from 'react-native'
import Theme from '../../utils/theme'
// import { backgroundColor, themeColor, textColor } from '../../constants'

export const styles = StyleSheet.create({
    backgroundImage: {
        width: '100%',
        height: '100%'
    },
    container: {
        backgroundColor: Theme['light'].colors.background
    },
    content: {
        height: '100%', 
        backgroundColor: Theme['light'].colors.background,
        justifyContent: 'space-evenly'
    },
    logo: {
        alignSelf: 'center',
        height: 100,
        width: 200,
    },
    inputsView: {
        width: '90%',
        alignSelf: 'center'
    },
    inputItem: {
        borderBottomWidth: 2,
        borderBottomColor: Theme['light'].colors.background,
        marginTop: 5,
        marginBottom: 5
    },
    input: {
        color: Theme['light'].colors.dark_text,
        height: 55
    },
    button: {
        alignSelf: 'center',
        width: '100%',
        height: 55,
        marginTop: 5,
        marginBottom: 5,
        justifyContent: 'center',
        backgroundColor: Theme['light'].colors.background
    },
    buttonText: {
        color: backgroundColor,
        fontWeight: 'bold',
        fontSize: 16
    }
})