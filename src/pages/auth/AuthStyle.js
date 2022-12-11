import { StyleSheet } from "react-native";
import Theme from "../../utils/theme";

export default StyleSheet.create({

    headingContainerWithBackButton: {
        marginTop: 25
    },

    headingContainer: {
        paddingHorizontal: 20,
        marginVertical: 10,
        justifyContent: 'center',
    },

    alignItemsFlexStart: {
        alignItems: 'flex-start'
    },

    headingContentContainer: {
        width: '100%'
    },

    headingImageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30
    },

    headingImage: {
        width: 92,
        height: 92
    },

    heading: {
        color: Theme['light'].colors.darken,
        fontSize: 18,
        fontFamily: Theme.font.CSemiBold,
        textAlign: 'left',
    },

    subHeading: {
        color: Theme['light'].colors.primary,
        fontSize: 12,
        fontFamily: Theme.font.CRegular,
        textAlign: 'left',
        marginTop: 0,
        lineHeight: 17
    },

    headingContainerButtonLeft: {
        marginBottom: 30
    },

    headingContainerButtonLeftIcon: {
        fontSize: 25,
        color: Theme['light'].colors.darken,
        fontFamily: Theme.font.CBold,
    },

    formContainer: {
        paddingHorizontal: 25,
        backgroundColor: 'transparent',
        flexDirection: 'column',
        justifyContent: 'space-between',
        
    },

    formInnerContainer: {
        flex: 1,
    },

    textContainer: {
        marginTop: 25,
        flexDirection: 'row',
        justifyContent: 'flex-end'

    },

    textContainerButton: {
        padding: 5
    },

    textContainerButtonText: {
        color: Theme['light'].colors.secondary,
        fontSize: 12,
        textAlign: 'left',
        fontFamily: Theme.font.CRegular
    },

    bottomTextContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        marginBottom: 25,
    },

    linkText: {
        color: Theme['light'].colors.primary,
        fontFamily: Theme.font.CSemiBold
    },

    otpContainer: {
        alignItems: 'center',
        marginBottom: 40
    },

    otpInputView: {
        flex: 0,
        height: 52,
        width: 250,
    },

    codeInputFieldStyle: {
        borderWidth: 0,
        position: 'relative',
        fontSize: 16,
        color: Theme['light'].colors.secondary,
        borderRadius: 8,
        backgroundColor: Theme['light'].colors.tertiary,
        shadowColor: Theme['light'].colors.grayish,
        shadowOffset: {
            width: 3,
            height: 2,
        },
        shadowOpacity: 0.06,
        shadowRadius: 9,
        elevation: 4,
    },

    codeInputHighlightStyle: {
        borderColor: Theme['light'].colors.primary,
        color: Theme['light'].colors.primary
    },

    buttonContainer: {
        marginTop: 25,
    },

    centerText: {
        textAlign: 'center',
        marginVertical:5
    },

    centerView: {
        alignItems: 'center'
    },

    linkButtonWithIcon: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    linkButtonText: {
        fontSize: 14,
        color: Theme['light'].colors.primary,
        fontFamily: Theme.font.CSemiBold,
        marginRight: 10
    },

    linkButtonIcon: {
        fontSize: 60,
        color: Theme['light'].colors.primary,
        fontFamily: Theme.font.CRegular
    },

    linkButtonIconId: {
        fontFamily: Theme.font.CRegular,
        fontSize: 20,
        color: Theme['light'].colors.primary,
    },

    signUpLogo: {
        width: 150,
        height: 66,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    logoCenter:{
        display:'flex',
        justifyContent:'center',
        flexDirection:'row',
        alignItems:'center'
    },

    methodListTitle: {
        fontSize: 14,
        color: Theme['light'].colors.lightText,
        fontFamily: Theme.font.CRegular,
        textAlign: 'center',
        marginTop: 30,
        marginBottom: 20
    },

    methodList: {
        flexDirection: 'row',
        justifyContent: 'center',

    },

    confirmBio: {
        textAlign: 'center'
    },

    methodListCnic: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20

    },

    loginButton: {
        fontFamily: Theme.font.CSemiBold,
        fontSize: 27,
    },

    cnicLoginBio: {
        fontWeight: 'bold',
        fontSize: 16,
        color: Theme['light'].colors.primary,
    },

    methodItem: {
        marginHorizontal: 15,
        alignItems: 'center'
    },

    methodItemIconContainer: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Theme['light'].colors.primaryLighten,
        borderRadius: 40
    },

    methodItemIcon: {
        fontSize: 24,
        color: Theme['light'].colors.primary,
    },

    methodItemTitle: {
        fontSize: 19,
        color: Theme['light'].colors.primary,
        marginTop: 5,
        fontFamily: Theme.font.CMedium
    },

    formInput: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    timer: {
        borderColor: Theme['light'].colors.primary,
    },

    textTimer: {
        color: Theme['light'].colors.primary,
    },

    textLabelStyle: {
        color: Theme['light'].colors.primary,
    },

    seperatorStyle: {
        color: Theme['light'].colors.primary,
    },

    counterText: {
        color: Theme['light'].colors.lightText,
        fontFamily: Theme.font.CBold
    },

});