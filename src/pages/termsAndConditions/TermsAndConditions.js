
import React from 'react';
import { Text, View, } from 'react-native'
import { Styles } from './TermsAndConditionStyle';
import Header from '../../containers/header/Header';


function TermsAndConditions() {

    const HeaderOption = {
        Title: 'Privacy Policy',
        isBack: true
      }
    return (
        <ViewContainer>
            <Header {...HeaderOption} />
            <View style={Styles.container}>
                <Text >This Terms of Use agreement was last updated on February 18, 2022, and is effective as of November 11, 2019.</Text>
                <Text>Tas-Ker primarily operates, controls and manages the Platform and the Services (as defined below).</Text>
                <Text>PLEASE READ THE TERMS OF USE THOROUGHLY AND CAREFULLY.</Text>
                <Text>Acceptance of Terms</Text>
                <Text>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</Text>
                <Text>Modification to Terms of Use and Privacy Policy</Text>
                <Text>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</Text>
            </View>
        </ViewContainer>
    )
}

export default TermsAndConditions