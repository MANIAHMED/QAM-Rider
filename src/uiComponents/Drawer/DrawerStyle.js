import { StyleSheet } from 'react-native'
import { themeColor, textColor, backgroundColor } from '../../constants';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: '100%',
        width: '100%'
    },
    bannerView: {
        height: '10%',
        width: '100%',
        backgroundColor: themeColor,
        flexDirection: 'row',
        paddingLeft: 20
    },
    avatar: {
        aspectRatio: 1,
        alignSelf: 'center',
        width: '30%',
        resizeMode: 'contain'
    },
    userDetailView: {
        alignSelf: 'center',
    },
    nameText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: backgroundColor,
    },
    ratingView: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    ratingText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: backgroundColor
    },
    ratingStarContainer: {
        alignSelf: 'center',
        paddingLeft: 5,
        paddingRight: 5
    },
    listContainer: {
        height: '70%',
        width: '100%',
        backgroundColor: '#fff'
    },
    textFont: {
        fontFamily: "Omnes",
        width: '100%',
        marginLeft: 10
    },

    heading: {
        fontWeight: 'bold'
    }
});