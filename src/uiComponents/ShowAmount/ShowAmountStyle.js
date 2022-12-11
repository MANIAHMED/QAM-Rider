import { StyleSheet } from 'react-native';
import { lightTextColor, themeColor, backgroundColor, SH, textColor, } from '../../constants';

export const styles = StyleSheet.create({
    remarksModalContainer: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        height: '100%',
        justifyContent: 'center'
    },
    remarksModalContent: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: backgroundColor,
        borderRadius: 10
    },
    remarksModalHeading: {
        width: '95%',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    remarkModalInput: {
        width: '95%',
        alignSelf: 'center',
        marginBottom: 10
    },
    remarksModalButtonView: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    remarksModalCloseButton: {
        margin: 5
    },
    remarksModalCloseButtonText: {
        fontWeight: 'bold'
    },
    remarksModalSubmitButton: {
        margin: 5,
        marginRight: 10
    },
    remarksModalSubmitButtonText: {
        fontWeight: 'bold',
        color: themeColor
    },
    rateYourRiderContainer: {
        backgroundColor: themeColor + '8a',
        justifyContent: 'space-evenly',
        width: '100%',
        height: '100%',
    },
    bookingNumberText: {
        color: backgroundColor,
        fontWeight: 'bold',
        fontSize: 32,
        textAlign: 'center',
    },
    viewContainer: {
        backgroundColor: backgroundColor,
        width: '90%',
        height: 550,
        alignSelf: 'center',
        borderRadius: 25,
        justifyContent: 'space-around'
    },
    headingText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 26,
        color: lightTextColor,
    },
    amountText: {
        fontSize: 52,
        color: themeColor,
    },
    button: {
        backgroundColor: themeColor,
        width: '90%',
        height: 60,
        justifyContent: 'center',
        borderRadius: 25,
        alignSelf: 'center',
        // position: 'absolute',
        // bottom: 20
    },
    buttonText: {
        color: backgroundColor,
        fontWeight: 'bold',
        fontSize: 22
    }
})