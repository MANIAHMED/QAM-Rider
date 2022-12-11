import { StyleSheet } from 'react-native';
import { lightTextColor, themeColor, backgroundColor, SH, textColor, } from '../../constants';

export const styles = StyleSheet.create({
    content: {
        backgroundColor: backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    QRContainer: {
        marginVertical: 15
    },
    QRText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: themeColor,
        marginVertical: 15
    },
    footer: {
        backgroundColor: themeColor
    },
    footerButton: {
        backgroundColor: themeColor,
        width: '100%',
        height: '100%',
        justifyContent: 'center'
    },
    footerButtonText: {
        color: backgroundColor,
        fontWeight: 'bold'
    }
})