import { StyleSheet } from 'react-native';
import { backgroundColor, themeColor, textColor, lightTextColor } from '../../constants';

export const styles = StyleSheet.create({
    headerTabsContainer: {
        backgroundColor: themeColor,
        paddingBottom: 10,
        // flexDirection: 'row',
        // width: '100%',
        // justifyContent: 'space-evenly',
        // height: 50,
        // paddingHorizontal: 15
    },
    scrollView: {
        paddingHorizontal: 10
    },
    tabView: {    
        justifyContent: 'center',
        borderRadius: 5,
        padding: 15,
        // height: 50,
        // marginHorizontal: 0
    },
    tabText: {
        textAlign: 'center',
        // width: '100%',
        fontWeight: 'bold',
        fontSize: 13

    },
    container: {
        // height: '100%',
        backgroundColor: backgroundColor,
        paddingBottom: 10,
        paddingHorizontal: 10
    },

    listItem: {
        backgroundColor: 'white',
        alignSelf: 'center',
        marginTop: 10,
        width: '100%',
        marginHorizontal: 15,
        borderRadius: 5,
        elevation: 3,
        flexDirection: 'row',
        padding: 15
    },
    itemDetail: {
        flex: 1,
        marginLeft: 15
    },
    itemHeader: {
        flexDirection: 'row',
        alignItems: 'center'
       
    },
    itemName: {
        fontSize: 14,
        color: themeColor,
        fontWeight: 'bold',
        flex: 1
    },
    itemStatus: { 
        backgroundColor: themeColor,
        color: backgroundColor,
        textAlign: 'center',
        width: '100%',
        fontSize: 10,
        fontWeight: 'bold',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        width: 'auto'
    },
    addressContainer: { 
        marginVertical: 5
    },
    address: {
        flexDirection: 'row'
    },
    addressHeading: {
        color: themeColor,
        fontSize: 12,
        fontWeight: 'bold',
        marginRight: 5
    },
    addressText: {
        fontSize: 12,
        flex: 1
    },
    priceText: {
        fontSize: 10,
        fontWeight: 'bold'
    },
    priceTextBold: {
        fontSize: 10,
        color: themeColor
    },

    left: {
        paddingLeft: 10
    },
    thumbnail: {
        height: 70,
        width: 70,
        borderRadius: 70,
        backgroundColor: themeColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    thumbnailText: {
        color: backgroundColor,
        fontWeight: 'bold'
    },
    body: {
        borderBottomWidth: 0,
    },
    right: {
        flexDirection: 'column',
        borderBottomWidth: 0,
        justifyContent: 'space-between'

    },
    textView: {
        flexDirection: 'row',
        // backgroundColor: 'blue',
        overflow: 'hidden'
    },
    merchantName: {
        fontWeight: 'bold',
        color: themeColor
    },
    bodyText: {
        fontSize: 14,
        color: textColor,
    },
    bodyHeading: {
        fontWeight: 'bold'
    },
    timeText: {
        fontSize: 14,
        color: lightTextColor
    },
    statusPriceView: {
        justifyContent: 'space-between', 
        // alignItems: 'center'
    },
    priceView: {
        flexDirection: 'row'
    },
    statusView: {
        width: 110,
        paddingTop: 2,
        paddingBottom: 4,
        borderRadius: 15,
        backgroundColor: themeColor,
        justifyContent: 'center'
    },
    statusText: {
        fontWeight: 'bold',
        color: backgroundColor,
        textAlign: 'center',
        width: '100%'
    },
  
})