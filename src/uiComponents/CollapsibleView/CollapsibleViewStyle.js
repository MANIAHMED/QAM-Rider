import { I18nManager, StyleSheet } from 'react-native';
import Theme from '../../utils/theme';
// import { backgroundColor, themeColor, lightTextColor } from '../../constants';
export default  StyleSheet.create({


    collapseContainer: {
        backgroundColor: Theme['light'].colors.background
    },
    collapseButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: Theme['light'].colors.background,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
    },
    collapseButtonIcon: {
        width: 50,
        height: 2,
        backgroundColor: Theme['light'].colors.background
    }
})