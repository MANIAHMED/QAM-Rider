import React, { Component } from 'react'
import { themeColor, backgroundColor } from '../../constants'
import { styles } from './MerchantUserMarker.style'
import { SvgXml } from 'react-native-svg';

const MerchantUserMarker = ({ width = 80, height = 52, style = {}, color = themeColor, background = backgroundColor }) => {
    const marker = `
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 55.4 69.7">
        <path stroke="${color}" stroke-width="1" fill="${color}" id="XMLID_12_" class="st0" d="M49.6,10.8c-4.5-5.9-11-9.6-18.4-10.6c-7.3-0.9-14.6,1-20.5,5.5c-5.9,4.5-9.6,11-10.6,18.4
        C-1.7,38.9,8.4,52.4,22.8,55l4.3,14.7l5-14.6c12.1-1.9,21.5-11.6,23-23.8C56.1,23.9,54.2,16.6,49.6,10.8z"/>
        <path fill="${background}" id="XMLID_11_" class="st1" d="M53.2,31c-1.5,11.7-10.8,20.9-22.5,22.2l-3.4,9.8l-2.9-9.9c-14.1-1.8-24-14.7-22.2-28.8
        S16.9,0.4,31,2.2S55,16.9,53.2,31z"/>
    </svg>
    `
    return (
        <SvgXml xml={marker} height={height} width={width} style={[styles, style]} />
    )
}

export default MerchantUserMarker