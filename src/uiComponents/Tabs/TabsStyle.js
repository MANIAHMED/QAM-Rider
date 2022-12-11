import { StyleSheet } from "react-native";
import Theme from "../../utils/theme";
// import { themeColor, lightTextColor, backgroundColor } from "../../constants";

export const styles = StyleSheet.create({
    tabs: {
        flexDirection: 'row',
    },
    tab: {
        // width: 120,
        justifyContent: 'center',
        margin: 10,
        borderRadius: 10
    },
    tabText: {
        textAlign: 'center',
        color: Theme['light'].colors.primary,
        fontWeight: 'bold',
        marginLeft: 5,
        marginRight: 5
    },
    noBookingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    noBookingText: {
        textAlign: 'center',
        color: themeColor,
        fontWeight: 'bold'
    }
});