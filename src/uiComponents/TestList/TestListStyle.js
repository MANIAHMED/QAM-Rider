import { StyleSheet } from 'react-native';
import { lightTextColor, themeColor, backgroundColor, SH, textColor, } from '../../constants';

export const styles = StyleSheet.create({
    content: {
        backgroundColor: backgroundColor
    },
    listView: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
        // margin: 2,
        justifyContent: 'space-between',
        borderBottomColor: lightTextColor + '5b',
        borderBottomWidth: 0.5
    },
    listViewText: {
        color: lightTextColor,
        // fontWeight: 'bold',
        fontSize: 18
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