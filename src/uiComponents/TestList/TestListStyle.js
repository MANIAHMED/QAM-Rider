import { StyleSheet } from 'react-native';
import Theme from '../../utils/theme';

export const styles = StyleSheet.create({
    content: {
        backgroundColor: Theme['light'].colors.background
    },
    listView: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
        // margin: 2,
        justifyContent: 'space-between',
        borderBottomColor:  Theme['light'].colors.primary + '5b',
        borderBottomWidth: 0.5
    },
    listViewText: {
        color: Theme['light'].colors.primary ,
        // fontWeight: 'bold',
        fontSize: 18
    },
    footer: {
        backgroundColor: Theme['light'].colors.background 
    },
    footerButton: {
        backgroundColor: Theme['light'].colors.background ,
        width: '100%',
        height: '100%',
        justifyContent: 'center'
    },
    footerButtonText: {
        color: Theme['light'].colors.primary ,
        fontWeight: 'bold'
    }
})