import { StyleSheet } from "react-native";
import Theme from "../../utils/theme";

export default StyleSheet.create({
    container : {
        flex:1,
        backgroundColor: Theme['light'].colors.background
    },
    authContainer: {
        flex:1,
        resizeMode:'cover'
        
    },

    inputContainer: {
        marginVertical:20
    },
 inputLabel: {
        fontSize: 12,
        color: Theme['light'].colors.primary,
        fontFamily: Theme.font.semiBold,
       

    },
   inputStyle: {
        minHeight: 48,
        fontSize: 12,
        paddingHorizontal: 15,
        color: Theme['light'].colors.primary,
    },

   errorTextStyle: {
        color: Theme['light'].colors.danger,
        marginTop: 18,
        fontSize: 12,
        textAlign: 'left'
    },

    inputInnerContainerStyle: {
        position: 'relative',
        borderRadius: 10,
        backgroundColor: Theme['light'].colors.input_background,
        shadowColor: Theme['light'].colors.primary,
        shadowOffset: {
            width: 3,
            height: 2,
        },
        shadowOpacity: 0.06,
        shadowRadius: 9,
        elevation: 2,
        top: 10,
    },

 
})