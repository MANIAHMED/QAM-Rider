import { StyleSheet } from 'react-native'
import { lightTextColor, themeColor } from '../../constants'
import Theme from '../../utils/theme'

export default  StyleSheet.create({

    addressTimeline: {
        flexDirection: 'row',
      
    },
    timelineView: {
        width: '12.5%',
        justifyContent: 'center',
    },
    addressView: {
        width: '87.5%',
        height: '100%',
        justifyContent: 'center',
    },
    fromAddressView: {
        height: 50
    },
    toAddressView: {
        height: 50
    },
    icon: {
        alignSelf: 'center'
    },
    timelineBorder: {
        height: 15,
        borderWidth: 0.5,
        borderColor: Theme['light'].colors.dark_text,
        width: 1,
        alignSelf: 'center'
    },
    addressLineOne: {
        fontWeight: 'bold',
        fontSize: 14,
        color: themeColor
    },
    addressLineTwo: {
        color: Theme['light'].colors.dark_text,
        fontSize: 14
    },
    menuButtonSection: {
        alignSelf: 'flex-end',
        flex: 1,
        width: '10%',
        height: '100%',
        justifyContent: 'center',
    },
    menuButtonView: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end'
    },
    menuButtonIcon: {
        alignSelf: 'center'
    }
})