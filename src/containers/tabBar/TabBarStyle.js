import { StyleSheet } from 'react-native'
import Theme from "../../utils/theme";

export default StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: Theme['light'].colors.background,
        minHeight: 60,
    },
    leftButtonIcon: {
        marginRight: 10,
        width: 20,
        height: 20
    },
    tabButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    tabButtonActive: {},
    tabButtonIcon: {
        fontSize: 26,
        color: Theme['light'].colors.icon_color
    },
    tabButtonIconActive: {
        color: Theme['light'].colors.primary
    },
    tabButtonBorder: {
        width: 29,
        height: 3,
        backgroundColor: 'transparent',
        borderRadius: 10,
        marginTop: 5,
    },
    tabButtonBorderActive: {
        backgroundColor: Theme['light'].colors.primary,

    }
});