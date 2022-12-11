import { I18nManager, StyleSheet } from 'react-native';
import { backgroundColor, themeColor, lightTextColor } from '../../constants';
export default  StyleSheet.create({


    collapseContainer: {
        backgroundColor: backgroundColor
    },
    collapseButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: backgroundColor,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
    },
    collapseButtonIcon: {
        width: 50,
        height: 2,
        backgroundColor: lightTextColor
    }
})