import { StyleSheet } from 'react-native';
import Theme from '../../utils/theme';
// import { lightTextColor, themeColor, backgroundColor, SH, textColor, } from '../../constants';

export const styles = StyleSheet.create({
    content: {
        backgroundColor: Theme['light'].colors.background,
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
        color: Theme['light'].colors.background ,
        marginVertical: 15
    },
    footer: {
        backgroundColor: Theme['light'].colors.background
    },
    footerButton: {
        backgroundColor: Theme['light'].colors.background,
        width: '100%',
        height: '100%',
        justifyContent: 'center'
    },
    footerButtonText: {
        color: Theme['light'].colors.background,
        fontWeight: 'bold'
    }
})