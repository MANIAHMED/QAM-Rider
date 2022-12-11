import React from "react";
import { Image } from "react-native";


function ProgressiveImage(props) {
    return (
        <Image {...props} />
    )
}

export default React.memo(ProgressiveImage) ;