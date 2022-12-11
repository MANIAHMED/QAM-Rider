import { StyleSheet } from 'react-native';
import Theme from '../../utils/theme';
// import { lightTextColor, themeColor, backgroundColor, SH, textColor, loaderBackgroundColor, } from '../../constants';

export default  StyleSheet.create({
    heading: { 
        color: themeColor, 
        textAlign: 'center', 
        marginTop: 15, 
        marginBottom: 15, 
        fontSize: 18, 
        fontWeight: 'bold' 
    },
    listView: {
        flexDirection: 'row',
        elevation: 5,
        backgroundColor: Theme['light'].colors.background,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 5,
        width: '95%',
        alignSelf: 'center'
        // margin: 2,
        // justifyContent: 'space-between',
        // borderBottomColor: lightTextColor + '5b',
        // borderBottomWidth: 0.5
    },
    listViewText: {
        color: themeColor,
        textAlign: 'center',
        width: '100%',
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
    },
    appointmentListView: {
        flexDirection: 'column',
        elevation: 5,
        backgroundColor: backgroundColor,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 15
    },
    listItem: {
        flexDirection: 'row'
    },
    listItemTitle: {
        fontSize: 12,
        marginBottom: 5,
        fontWeight: 'bold',
        color: lightTextColor,
        flex: 1,
        marginRight: 10
    },
    listItemText: {
        fontSize: 14,
        color: textColor
    },
})