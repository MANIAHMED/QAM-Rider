import { StyleSheet } from 'react-native';
import Theme from '../../utils/theme';
// import { lightTextColor, themeColor, backgroundColor, SH, textColor, loaderBackgroundColor, } from '../../constants';

export default  StyleSheet.create({
    heading: { 
        color: Theme['light'].colors.dark_text, 
        textAlign: 'center', 
        marginTop: 15, 
        marginBottom: 15, 
        fontSize: 18, 
        fontWeight: 'bold' 
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