import React from 'react'
import React from 'react'
import { Text, View } from 'react-native';
import Styles from './AddressTimelineStyle';
import Theme from '../../utils/theme';
import Entypo from 'react-native-vector-icons/Entypo';

function AddressTimeline({ from, to, isMenuBtn, customerNumber = '' }) {

    const [visible, setVisible] = useState(false);

    const _openMenu = () => {
        setVisible(true)
    }
    const _closeMenu = () => {
        setVisible(false)
    }
    return (
        <View style={Styles.addressTimeline}>
            <View style={Styles.timelineView} >
                <Entypo name="dot-single" size={30} color={Theme['light'].colors.primary + '8a'} style={Styles.icon} />
                <View style={Styles.timelineBorder}>

                </View>
                <Entypo name="dot-single" size={30} color={Theme['light'].colors.primary} style={Styles.icon} />
            </View>
            <View style={Styles.addressView}>
                <View style={Styles.fromAddressView} >
                    <Text style={Styles.addressLineOne}>From</Text>
                    <Text style={Styles.addressLineTwo} numberOfLines={1}>{from || ''}</Text>
                </View>
                <View style={Styles.toAddressView} >
                    <Text style={Styles.addressLineOne}>To</Text>
                    <Text style={Styles.addressLineTwo} numberOfLines={1}>{to || ''}</Text>
                </View>
            </View>
        </View>
    )
}

export default AddressTimeline;



