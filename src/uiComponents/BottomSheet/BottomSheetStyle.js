import { StyleSheet } from 'react-native';
import Theme from '../../utils/theme';

export default  StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
    header: {
        paddingVertical: 10,
        paddingHorizontal: 25,
        flexDirection: 'row',
        alignItems: 'center',
    },

    headerTitle: {
        fontSize: 16,
        flex: 1
    },
    headerButtons: {
        paddingVertical: 0
    },
    headerButton: { 
        height: 30, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: Theme['light'].colors.background, 
        elevation: 0, 
        borderColor: Theme['light'].colors.background, 
        borderWidth: 1,
        borderRadius: 20,
        minWidth: 70,
        marginRight: 5
    },
    headerButtonText: {
        marginLeft: 7.5,
        marginRight: 7.5
    },
    list: {
        flex: 1,
    },
    listItem: {
        paddingVertical: 10,
        paddingHorizontal: 25,
        flexDirection: 'column'
    },
    listItemTitle: {
        fontSize: 12,
        marginBottom: 5,
        fontWeight: 'bold',
        color: Theme['light'].colors.background
    },
    listItemText: {
        fontSize: 14,
        color: 'gray'
    },
})