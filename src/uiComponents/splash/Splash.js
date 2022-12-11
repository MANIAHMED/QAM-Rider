



import React from 'react';
import { ProgressiveImage } from "../../containers";
import GlobalStyle from "../../assets/stylings/GlobalStyle";
import {ViewContainer} from "../../containers";

function Splash() {
    return(
        <ViewContainer style={GlobalStyle.authContainer}>
            <ProgressiveImage
                style={GlobalStyle.authContainerLogo}
                source={require('../../assets/images/splashScreen.png')}/>
        </ViewContainer>
    )
}
export default Splash;