import { StyleSheet } from 'react-native';
import Theme from '../../utils/theme';
// import { lightTextColor, themeColor, backgroundColor, SH, textColor, } from '../../constants';

export const styles = StyleSheet.create({
    heading: {
        color: Theme['light'].colors.primary,
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
        fontSize: 18,
        fontWeight: 'bold'
    },
    inputsView: {
        width: '90%',
        alignSelf: 'center',
    },
    card: {
        borderRadius: 20,
        elevation: 10
    },
    cardItem: {
        backgroundColor: 'transparent'
    },
    nameText: { 
        fontWeight: 'bold', 
        fontSize: 16 
    },
    inputItem: {
        borderBottomWidth: 2,
        borderBottomColor: Theme['light'].colors.primary,
        marginTop: 5,
        marginBottom: 5
    },
    input: {
        color: textColor,
        height: 55
    },

    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 5
    },
    footer: {
        backgroundColor: Theme['light'].colors.primary
    },
    footerButton: {
        backgroundColor: Theme['light'].colors.primary,
        width: '100%',
        height: '100%',
        justifyContent: 'center'
    },
    footerButtonText: {
        color: Theme['light'].colors.primary,
        fontWeight: 'bold'
    }
})