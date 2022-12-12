import { StyleSheet } from 'react-native'
import Theme from '../../utils/theme';
// import { SH, themeColor, lightTextColor, backgroundColor } from '../../constants';

export const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%'
    },
    mapContainer: {
        flex: 1
    },
    map: {
        flex: 1
    },
    currentLocationButton: {
        backgroundColor: Theme['light'].colors.background ,
        position: 'absolute',
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        right: 10,
        top: 10
    },
    trafficButton: {
        backgroundColor: Theme['light'].colors.background ,
        position: 'absolute',
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        right: 10,
        top: 60
    },
    navigateButton: {
        backgroundColor: Theme['light'].colors.background ,
        position: 'absolute',
        bottom: 10,
        right: 10
    },
    navigateButtonText: {
        color: Theme['light'].colors.primary ,
        fontWeight: 'bold'
    },
    merchantNameHeading: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        color: Theme['light'].colors.background ,
        marginTop: 10
    },
    logo: {
        // aspectRatio: 500 / 700
    }
});