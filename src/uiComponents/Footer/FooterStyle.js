import { StyleSheet } from "react-native";
import Theme from "../../utils/theme";
// import { themeColor, textColor, backgroundColor } from "../../constants";

export const styles = StyleSheet.create({
    footer: {
        backgroundColor: Theme['light'].colors.background,
        width: '100%',
        justifyContent: 'flex-start',
    },
    leftView: {
        width: 50, 
        height: 50, 
        borderRadius: 60, 
        backgroundColor: 'rgba(0,0,0,0.1)', 
        justifyContent: 'center', 
        margin: 10
    },
    animation: {
        width: 60, 
        height: 60, 
        alignSelf: 'center'
    },
    body: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    bodyText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: Theme['light'].colors.background
    },
    right: {
        alignItems: 'flex-end',
    },
    switchContainer: {
        width: 50,
        height: 22,
        borderRadius: 25,
        backgroundColor: '#ccc',
        padding: 1,
        marginRight: 10
    },
    switchCircle: {
        width: 20,
        height: 20,
        borderRadius: 20,
        // backgroundColor: 'white', // rgb(102,134,205)
    }
})