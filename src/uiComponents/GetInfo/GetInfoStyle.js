import { StyleSheet } from 'react-native';
import { lightTextColor, themeColor, backgroundColor, SH, textColor, } from '../../constants';

export const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: backgroundColor,
        width: '100%',
        height: '100%',
        justifyContent: 'space-evenly'
    },
    infoText: {
        textAlign: 'center',
        color: themeColor,
        fontWeight: 'bold',
        fontSize: 22
    },
    inputsView: {
        width: '90%',
        alignSelf: 'center',
    },
    inputItem: {
        borderBottomWidth: 2,
        borderBottomColor: themeColor,
        marginTop: 5,
        marginBottom: 5
    },
    input: {
        color: textColor,
        height: 55
    },
    button: {
        alignSelf: 'center',
        width: '100%',
        height: 55,
        marginTop: 5,
        marginBottom: 5,
        justifyContent: 'center',
        backgroundColor: themeColor
    },
    uploadButton: {
        alignSelf: 'center',
        width: '100%',
        height: 55,
        marginTop: 5,
        marginBottom: 5,
        justifyContent: 'center',
        elevation: 0,
        borderColor: themeColor,
        borderWidth: 2,
        backgroundColor: 'transparent'
    },
    buttonText: {
        color: backgroundColor,
        fontWeight: 'bold',
        fontSize: 16
    },
    uploadButtonText: {
        color: themeColor,
        fontWeight: 'bold',
        fontSize: 16
    },
    errorText: {
        color: 'red',
        fontSize: 16
    },
    imageScrollContainer: {
        flexDirection: 'row'
    },
    imageView: {
        borderRadius: 5,
        marginRight: 10,
        position: 'relative'
    },
    imageDeleteButton: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        // top: 0,
        // right: 0,
        zIndex: 100
    },
    image: {
        height: 200,
        borderRadius: 5,
        // position: 'relative',
    }
})