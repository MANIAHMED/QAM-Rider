import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    listInnerContainer: {
        paddingBottom: 25
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 20,
        paddingBottom: 20 ,
        borderBottomWidth: 1,
        borderColor: '#e2e2e2',
    },
    listItemImage: {
        width: 68,
        height: 68,
        borderRadius: 68/2,
        borderWidth: 2,
        borderColor: '#86be40',
        resizeMode: 'cover'
    },
    listItemContent: {
        flex: 1,
        marginHorizontal: 15
    },
    name: {
        fontSize: 18,
        marginBottom: 5,
        fontFamily: 'Poppins-Bold',
        color: '#000000'
    },
    number: {
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        color: '#707070'
    },
    listItemButtonIcon: {
        fontSize: 16,
        padding: 5,
        color: '#86be40'
    },
    listFooter: {
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});