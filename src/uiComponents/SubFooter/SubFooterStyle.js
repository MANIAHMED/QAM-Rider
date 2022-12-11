import { StyleSheet } from "react-native";
import Theme from "../../utils/theme";
// import { themeColor, backgroundColor } from "../../constants";

export const styles = StyleSheet.create({
    footer: {
        backgroundColor: Theme['light'].colors.background,
        borderTopWidth: 1,
        borderTopColor: '#f5f5f5',
        width: '100%',
        justifyContent: 'flex-start',
    }
})