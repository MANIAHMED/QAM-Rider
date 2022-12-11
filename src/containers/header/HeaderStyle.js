import { StyleSheet, Platform } from 'react-native'
import Theme from "../../utils/theme";



export default  StyleSheet.create({
    header: {
        backgroundColor: Theme['light'].colors.background,
        width: '100%'
    },
    headerContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:20,
        paddingVertical:20
    },
    headerLeft:{
        flex:1,
        flexDirection:'row',
        alignItems:'center'
    },
    headerRight:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center'

    },
  

})