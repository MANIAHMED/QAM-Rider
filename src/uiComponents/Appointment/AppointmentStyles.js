import { StyleSheet } from 'react-native';
import Theme from '../../utils/theme';
// import { lightTextColor, themeColor, backgroundColor, SH, textColor, loaderBackgroundColor, } from '../../constants';

export default  StyleSheet.create({
    heading: { 
        color: Theme['light'].colors.background , 
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
        color: Theme['light'].colors.background ,
        textAlign: 'center',
        width: '100%',
        // fontWeight: 'bold',
        fontSize: 18
    },
    footer: {
        backgroundColor: Theme['light'].colors.background 
    },
    footerButton: {
        backgroundColor: Theme['light'].colors.background ,
        width: '100%',
        height: '100%',
        justifyContent: 'center'
    },
    footerButtonText: {
        color: Theme['light'].colors.background ,
        fontWeight: 'bold'
    },
    appointmentListView: {
        flexDirection: 'column',
        elevation: 5,
        backgroundColor: Theme['light'].colors.background ,
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
        color: Theme['light'].colors.background ,
        flex: 1,
        marginRight: 10
    },
    listItemText: {
        fontSize: 14,
        color: Theme['light'].colors.background 
    },
})