import { StyleSheet } from 'react-native'
import Theme from '../../utils/theme';
// import { themeColor, textColor, backgroundColor } from '../../constants';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: '100%',
        width: '100%'
    },
    bannerView: {
        height: '10%',
        width: '100%',
        backgroundColor: Theme['light'].colors.background,
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
        color: Theme['light'].colors.primary,
    },
    ratingView: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    ratingText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Theme['light'].colors.primary
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