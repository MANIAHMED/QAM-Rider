import { StyleSheet } from "react-native";
import Theme from "../../utils/theme";


export default StyleSheet.create({

    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    profile: {
        display:'flex',
        flexDirection:'row'
    },
    profileLeft: {
        flex: 1,
    },
    profileCenter: {
        flex: 5,
    },
    profileRight: {
        flex: 1,
    },

    hr:{
        borderBottomColor: Theme['light'].colors.dark_text,
        borderBottomWidth: 1,
    },
    

    // container: {
    //     backgroundColor: Theme['light'].colors.background,
    // },
    // textView: {
    //     width: '90%',
    //     alignSelf: 'center'
    // },
    // heading: {
    //     marginTop: 20,
    //     fontSize: 24,
    //     fontWeight: 'bold',
    //     color: Theme['light'].colors.primary,
    //     alignSelf: 'center'
    // },
    // text: {
    //     marginTop: 20,
    //     marginBottom: 10,
    //     color: textColor,
    //     fontSize: 18
    // }
})