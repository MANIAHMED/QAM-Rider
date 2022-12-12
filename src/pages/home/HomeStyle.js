import { StyleSheet } from 'react-native'
import { SH, themeColor, lightTextColor, backgroundColor } from '../../constants';

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
        backgroundColor: backgroundColor,
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
        backgroundColor: backgroundColor,
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
        backgroundColor: themeColor,
        position: 'absolute',
        bottom: 10,
        right: 10
    },
    navigateButtonText: {
        color: backgroundColor,
        fontWeight: 'bold'
    },
    merchantNameHeading: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        color: themeColor,
        marginTop: 10
    },
    logo: {
        // aspectRatio: 500 / 700
    }
});